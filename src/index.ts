import { getConfigYaml, writeConfigToFile } from "./utils";
import { Config } from "./interfaces";

export { Config };

export const createConfig = <Stages, JobNames>(
  config: Config<Stages, JobNames>,
  outputFile: string
): void => {
  const configYml = getConfigYaml(config);
  return writeConfigToFile(configYml, outputFile);
};
