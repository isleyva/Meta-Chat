import redis from "ioredis";

const redisClient = new redis(process.env.REDIS_URL!);

export default redisClient;
