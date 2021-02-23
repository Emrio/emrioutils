import { zip } from '../generators'

/**
 * createLinearTransform - Creates a function that transforms a vector from source1 to source2 into another vector from dest1 to dest2 in a linear fashion
 */
export function createLinearTransform (source1: number, source2: number, dest1: number, dest2: number): (x: number) => number {
  const a = (dest2 - dest1) / (source2 - source1)
  const b = (dest1 * source2 - source1 * dest2) / (source2 - source1)

  return x => a * x + b
}

export function createLinearTransformND (source1: number[], source2: number[], dest1: number[], dest2: number[]): (x: number[]) => number[] {
  if (source1.length !== source2.length || source1.length !== dest1.length || source1.length !== dest2.length) {
    throw new Error('Vectors must have the same number of dimensions')
  }

  const transforms: ((x: number) => number)[] = []
  for (const [src1, src2, dst1, dst2] of zip(source1, source2, dest1, dest2)) {
    transforms.push(createLinearTransform(src1, src2, dst1, dst2))
  }

  return (X: number[]): number[] => {
    if (X.length !== source1.length) {
      throw new Error('Input vecotr must have the same length as argument vectors')
    }

    return X.map((x, i) => transforms[i](x))
  }
}
