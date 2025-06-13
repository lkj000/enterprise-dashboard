import { currentDeployedArtifacts } from "../../data/currentDeployedArtifacts";

const updateValue = (value) => {
  const invalidValues = ["ntvalue", "nthvalue", "n-1value", "CURRENT_PROD_ARTIFACT_VALUE", "CURRENT_PROD_ARTIFACT", "PREV_PROD_ARTIFACT_VALUE", "PREV_PROD_ARTIFACT"];
  return invalidValues.includes(value) ? "" : value;
};

export const processData = currentDeployedArtifacts.map(item => {
  const { currentDeployedArtifact, previousDeployedArtifact, ...rest } = item;

  return {
    currentDeployedArtifact: updateValue(currentDeployedArtifact),
    previousDeployedArtifact: updateValue(previousDeployedArtifact),
    ...rest
  };
});