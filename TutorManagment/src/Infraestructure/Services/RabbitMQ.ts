import * as amqplib from 'amqplib';

export async function connect(): Promise<amqplib.Connection> {
  try {
    const connection = await amqplib.connect('amqp://guest:guest@localhost:5672');
    console.log("Conexión exitosa a RabbitMQ");
    return connection;
  } catch (error) {
    console.error("Error al conectar a RabbitMQ: ", error);
    throw error;
  }
}