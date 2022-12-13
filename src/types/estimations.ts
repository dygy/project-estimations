export type estimation = {
  project: string;
  time: string;
  client: string;
  avatarUrl: string;
  requirements: requirement[];
};

export type requirement = {
  text: string;
  hours: number;
};

export type selectedEstimation = {
  estimation: estimation;
  index: number;
};
