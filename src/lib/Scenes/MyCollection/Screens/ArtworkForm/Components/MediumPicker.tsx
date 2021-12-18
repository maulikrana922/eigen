import { ConsignmentSubmissionCategoryAggregation } from "__generated__/createConsignmentSubmissionMutation.graphql"
import { useArtworkForm } from "lib/Scenes/MyCollection/Screens/ArtworkForm/Form/useArtworkForm"
import { artworkMediumCategories } from "lib/utils/artworkMediumCategories"
import { Select } from "palette/elements/Select"
import React from "react"

export const MediumPicker: React.FC = () => {
  const { formik } = useArtworkForm()

  const handleValueChange = (value: ConsignmentSubmissionCategoryAggregation) => {
    formik.handleChange("medium")(value)
  }

  return (
    <Select
      onSelectValue={handleValueChange}
      value={formik.values.medium}
      enableSearch={false}
      title="Medium"
      placeholder="Select"
      options={artworkMediumCategories}
    />
  )
}