import type { IsNever, JsonObject, Paths } from 'type-fest';

//* keyof ConditionalExcept<Required<P>, Function>

export interface MappableProps<
  D extends JsonObject,
  PropName extends string = string
> {
  data?: D;
  propMapping?: Partial<
    Record<
      PropName,
      Paths<D> extends infer Path
        ? IsNever<Path> extends true
          ? string
          : Path
        : string
    >
  >;
}
