import fastify from "fastify";
import { eventsRoutes } from "./routes/events";
import {
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";
import { attendeesRoutes } from "./routes/attendees";
import { checkInRoutes } from "./routes/checkins";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(eventsRoutes);
app.register(attendeesRoutes);
app.register(checkInRoutes);
