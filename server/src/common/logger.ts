import pino from "pino";

const getInstance = (config: { name: string }): any => {
  const instance: pino.Logger = pino({
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "yyyy-mm-dd HH:MM:ss",
        ignore: "pid,hostname",
        messageFormat: "{msg}",
      },
    },
    level: "debug",
  });
  return instance.child(config);
};

const Logger = {
  getInstance,
};

export default Logger;
