import { DistanceMatrixRequest } from "../definitions"

export const dummyMatrixData: DistanceMatrixRequest = {
  matrix: { 
    axis: [
      {
        author: "Carlos Vega",
        filename: "posiciones_array3.py",
        id: "36IUJ1vO4630L5si8SZj"
      },
      {
        author: "Carlos Diaz",
        filename: "posiciones_array.py",
        id: "AutVOxg7xaeYMH2U8jxV"
      },
      {
        author: "Carlos Vega",
        filename: "posiciones_array3.py",
        id: "CaZGl69RfY6S5BtDmhMm"
      },
      {
        author: "Carlos Ruiz",
        filename: "posiciones_array2.py",
        id: "FUiH8Lq6HkUkpcU15CXG"
      }
    ],
    distance_matrix: [
      [
        -1,
        100.0,
        100.0,
        25.0
      ],
      [
        100.0,
        -1,
        100.0,
        25.0
      ],
      [
        100.0,
        100.0,
        -1,
        25.0
      ],
      [
        25.0,
        25.0,
        25.0,
        -1
      ]
    ]
  },
  message: "Distance matrix successfully retrieved"
}
