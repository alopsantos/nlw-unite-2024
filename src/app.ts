import fastify from "fastify";
import { eventsRoutes } from "./routes/events";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(eventsRoutes);
