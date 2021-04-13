import { Aggregations, FilterParamName } from "lib/Components/ArtworkFilter/ArtworkFilterHelpers"
import React from "react"
import { MediumOptionsScreen } from "../MediumOptions"
import { sharedAggregateFilterValidation, ValidationParams } from "./AggregationOptionCommonValidation"
import { getEssentialProps } from "./helper"

describe("Medium Options Screen", () => {
  const mockAggregations: Aggregations = [
    {
      slice: "MEDIUM",
      counts: [
        {
          name: "Prints",
          count: 2956,
          value: "prints",
        },
        {
          name: "Design",
          count: 513,
          value: "design",
        },
        {
          name: "Sculpture",
          count: 277,
          value: "sculpture",
        },
        {
          name: "Work on Paper",
          count: 149,
          value: "work-on-paper",
        },
        {
          name: "Painting",
          count: 145,
          value: "painting",
        },
        {
          name: "Drawing",
          count: 83,
          value: "drawing",
        },
        {
          name: "Jewelry",
          count: 9,
          value: "jewelry",
        },
        {
          name: "Photography",
          count: 4,
          value: "photography",
        },
      ],
    },
  ]

  const MockMediumScreen = () => <MediumOptionsScreen {...getEssentialProps()} />

  const aggregateParams: ValidationParams = {
    Screen: MockMediumScreen,
    aggregations: mockAggregations,
    paramName: FilterParamName.medium,
    filterKey: FilterParamName.medium,
    name: "medium",
  }
  sharedAggregateFilterValidation(aggregateParams)
})
