import { KeyboardEvent, useEffect, useState } from "react";
import { OrderedMap, OrderedSet, Seq } from "immutable";
import { pick } from "lodash";
import styled from "styled-components";

import { ClueId, ClueSpans } from "../common/ClueSpans";
import { ClueStarts } from "../common/ClueStarts";
import { Letters } from "../common/Letter";
import { Lights, togglingLightPair } from "../common/Lights";
import { Reference, Trajectory, cellTo } from "../common/Reference";
import { Tack, turn } from "../common/Tack";
import { Transits } from "../common/Transits";

import { Cell, CellProps } from "./Cell";
import { StateSetter } from "./Helpers";

export type Grid = OrderedMap<Reference, CellProps>;

export type Mode = "lights" | "clues";

export const newGrid = (size: bigint): Grid =>
  OrderedMap(
    new Array(Number(size) ** 2).fill(null).map((_, index) => {
      const i = BigInt(index);
      const y = size / 2n - i / size;
      const x = (i % size) - size / 2n;
      const r = Reference({ x, y });
      return [r, { r, light: false }];
    })
  );

export const displayGrid = (
  size: bigint,
  lights: Lights | null,
  clueStarts: ClueStarts | null
): Grid => {
  const g = newGrid(size);
  if (!lights) return g;
  const cells = lights
    .filter((_, k) => g.has(k))
    .map((light, r) => ({ r, light } as CellProps));
  if (!clueStarts) return g.merge(cells);
  const numberedCells = cells.merge(
    clueStarts?.map((p, r) => ({ r, light: true, ...p })) ??
      (OrderedMap() as Grid)
  );
  return g.merge(numberedCells);
};

type RawGridProps = {
  size: number;
  cellSize: string;
  cellSelected: boolean;
};

const RawGrid = styled.div<RawGridProps>`
  padding: calc(1px + 0.05vmin);
  display: grid;
  place-content: start center;
  grid-template-columns: repeat(
    ${(props) => props.size},
    ${(props) => props.cellSize}
  );
  grid-template-rows: repeat(
    ${(props) => props.size},
    ${(props) => props.cellSize}
  );
  border: 1px black;
  width: fit-content;
  background-color: black;
  column-gap: calc(0.6px + 0.05vmin);
  row-gap: calc(0.6px + 0.05vmin);
  margin: auto;
  &:focus {
    outline: ${(props) => (props.cellSelected ? "none" : "lightskyblue solid")};
  }
`;

const nextValidCellTo = (
  grid: Grid,
  r: Reference,
  t: Trajectory
): Reference => {
  let next = cellTo(1n, r, t);
  let nextCell = grid.get(next);
  while (nextCell) {
    if (nextCell.light) return next;
    next = cellTo(1n, next, t);
    nextCell = grid.get(next);
  }
  return r;
};

export type GridProps = {
  size: bigint;
  grid: Grid;
  setLights: StateSetter<Lights | null>;
  letters: Letters | null;
  mode: Mode;
  setLetters?: StateSetter<Letters | null>;
  toggleOnHover?: boolean;
  transits?: Transits | null;
  clueSpans?: ClueSpans | null;
};

export const Grid = (props: GridProps) => {
  const { setLights, grid, letters, mode, setLetters, toggleOnHover } = props;
  const [selected, setSelected] = useState<Reference | null>(null);
  const [tack, setTack] = useState<Tack | null>(null);

  const { transits, clueSpans } = props;
  const selectedTransits = selected && transits && transits.get(selected);
  const tacks =
    selectedTransits &&
    (Seq.Keyed(selectedTransits)
      .filter((n) => !!n)
      .keySeq()
      .toOrderedSet() as OrderedSet<Tack>);

  useEffect(() => {
    selected
      ? setTack((t) => (t && tacks?.has(t) && t) || tacks?.first() || null)
      : setTack(null);
  }, [selected, tacks]);

  const selectedClueSpan =
    selectedTransits &&
    clueSpans &&
    (Seq.Keyed(selectedTransits)
      .filter((n, t) => !!n && t === tack)
      .map((n, t) => clueSpans.get(new ClueId(n!, t as Tack))!)
      .toSetSeq()
      .flatten() as OrderedSet<Reference>);

  const setLetter = (l: string | null) =>
    setLetters &&
    selected &&
    setLetters((ls) =>
      l ? (ls ?? OrderedMap()).set(selected, l) : ls?.delete(selected) ?? null
    );
  const toggleTack = () =>
    setTack((t) => (t && tacks?.size === 2 ? turn(t) : t));
  const selectOrToggleTack = (r: Reference) =>
    r.equals(selected) ? toggleTack() : setSelected(r);

  const toggleCell = (r: Reference) => setLights(togglingLightPair(r));
  const lightsProps = (r: Reference) => ({
    onClick: () => toggleCell(r),
    onDragEnter: () => toggleCell(r),
    onMouseEnter: () => (toggleOnHover ? toggleCell(r) : {}),
  });
  const clueProps = (r: Reference, light: boolean) => ({
    onClick: () => light && selectOrToggleTack(r),
  });

  const onKeyDown = ({ key, ...rest }: KeyboardEvent) => {
    const { altKey, ctrlKey, metaKey, shiftKey } = rest;
    if (altKey || ctrlKey || metaKey) return {};
    if (key.match(/^[A-Za-z]$/g)) return setLetter(key);
    if (shiftKey) return {};
    const arrow = key.match(/^Arrow(Left|Right|Down|Up)$/);
    if (arrow && selected)
      return setSelected(
        nextValidCellTo(grid, selected, arrow[1] as Trajectory)
      );
    switch (key) {
      case "Enter":
        toggleTack();
        break;
      case "Backspace":
        setLetter(null);
        break;
      case "Home":
        setSelected(grid.first(null)?.r ?? null);
        break;
      case "End":
        setSelected(grid.last(null)?.r ?? null);
        break;
      case "Escape":
        setSelected(null);
        break;
    }
  };

  return (
    <RawGrid
      size={Number(props.size)}
      cellSize="calc(7px + 3.5vmin)"
      cellSelected={!!selected}
      tabIndex={0}
      role="application"
      onBlur={() => setSelected(null)}
      onKeyDown={onKeyDown}
    >
      {[...grid].map(([r, cellProps]) => (
        <Cell
          key={`${r.x},${r.y}`}
          selected={r.equals(selected)}
          inSelectedClue={selectedClueSpan?.has(r) ?? false}
          letter={letters ? letters.get(r) : undefined}
          {...{ toggleOnHover }}
          {...pick(cellProps, ["r", "light", "clueNumber"])}
          {...(mode === "lights"
            ? lightsProps(r)
            : clueProps(r, cellProps.light))}
        />
      ))}
    </RawGrid>
  );
};
