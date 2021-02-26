import { getConfigYaml, writeConfigToFile } from "./utils";
import {
  Config,
  Variables,
  Need,
  Rule,
  Job,
  Artifacts,
  Image,
} from "./interfaces";

export { Config, Variables, Need, Rule, Job, Artifacts, Image };

export const createConfig = <Stages, JobNames>(
  config: Config<Stages, JobNames>,
  outputFile?: string
): string => {
  const configYml = getConfigYaml(config);
  if (!outputFile) return configYml;

  writeConfigToFile(configYml, outputFile);
  return configYml;
};
