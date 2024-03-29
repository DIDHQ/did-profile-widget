import { Hono } from "hono";
import { cors } from "hono/cors";
import { etag } from "hono/etag";
import { z } from "zod";

const querySchema = z.object({
  did_w: z.string().transform((val) => parseInt(val, 10)),
  did_h: z.string().transform((val) => parseInt(val, 10)),
  did_a: z.string().min(1),
  did_d: z.string().optional(),
  did_c: z
    .string()
    .optional()
    .transform((val) => (val ? JSON.parse(val) : {})),
});

const app = new Hono({ strict: false });

app.get(
  "/",
  cors({ origin: ["https://d.id", "http://localhost:3000"] }),
  etag(),
  async (c) => {
    const {
      did_w: width,
      did_h: height,
      did_d: did,
      did_c: config,
    } = querySchema.parse(c.req.query());
    const color = config.color || "#000000";

    return c.text(
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 70 28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
            a:hover {
              opacity: 0.5;
            }
          `}
        </style>
        <text x="0" y="15" fill={color}>
          {height}X{width}
        </text>
        <text x="0" y="25" fill={color}>
          {did}
        </text>
        <a href="https://did.id/" target="_blank">
          <path
            d="M12.7002 20C18.2002 20 22.7002 15.5 22.7002 10C22.7002 7.7 22.0002 5.7 20.7002 4C21.9002 3.1 22.7002 1.6 22.7002 0H12.7002C7.2002 0 2.7002 4.5 2.7002 10C2.7002 15.5 7.2002 20 12.7002 20ZM12.7002 4.6C15.7002 4.6 18.1002 7 18.1002 10C18.1002 13 15.7002 15.4 12.7002 15.4C9.7002 15.4 7.3002 13 7.3002 10C7.3002 7 9.7002 4.6 12.7002 4.6Z"
            fill="#00DF9B"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="360 12.5 10"
              to="0 12.5 10"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M25.5001 22.7C24.9001 21.2 23.7001 20.1 22.1001 19.6C19.5001 22.1 16.1001 23.4 12.8001 23.4C9.4001 23.4 6.1001 22.1 3.5001 19.6C1.9001 20.1 0.700098 21.2 0.100098 22.7C3.5001 26.2 8.1001 28 12.7001 28C17.3001 28 21.9001 26.2 25.5001 22.7Z"
            fill="#2471FE"
          />
        </a>
        {width >= height ? (
          <a href="/config">
            <path
              d="M56.6001 3.30005C55.3001 3.30005 54.4001 4.20005 54.4001 5.50005C54.4001 6.80005 55.3001 7.70005 56.6001 7.70005C57.9001 7.70005 58.8001 6.80005 58.8001 5.50005C58.8001 4.20005 57.9001 3.30005 56.6001 3.30005Z"
              fill={color}
            />
            <path
              d="M33.4002 23.7001C34.6152 23.7001 35.6002 22.7151 35.6002 21.5C35.6002 20.285 34.6152 19.3 33.4002 19.3C32.1852 19.3 31.2002 20.285 31.2002 21.5C31.2002 22.7151 32.1852 23.7001 33.4002 23.7001Z"
              fill={color}
            />
            <path
              d="M46.0003 9.1001C44.8003 9.1001 43.7003 9.5001 42.7003 10.2001C42.7003 7.4001 42.7003 4.3001 42.7003 4.3001C41.5003 3.7001 40.1003 3.7001 38.8003 4.3001V23.5001C40.0003 24.1001 41.5003 24.1001 42.7003 23.5001V22.7001C43.6003 23.4001 44.8003 23.8001 46.0003 23.8001C48.0003 23.8001 49.8003 22.8001 50.8003 21.0001C51.5003 19.8001 51.8003 18.3001 51.8003 16.5001C51.8003 14.7001 51.4003 13.2001 50.8003 12.0001C49.8003 10.2001 48.1003 9.1001 46.0003 9.1001ZM45.3003 20.4001C43.5003 20.4001 42.7003 18.6001 42.7003 16.4001C42.7003 14.2001 43.5003 12.4001 45.3003 12.4001C47.1003 12.4001 47.9003 14.4001 47.9003 16.4001C47.9003 18.4001 47.1003 20.4001 45.3003 20.4001Z"
              fill={color}
            />
            <path
              d="M54.6001 9.50005V23.4C55.8001 24 57.3001 24 58.5001 23.4V9.50005C57.3001 8.90005 55.9001 8.90005 54.6001 9.50005Z"
              fill={color}
            />
            <path
              d="M69.6001 20.3001H68.1001C67.5001 20.3001 67.0001 19.8001 67.0001 19.2001V12.5001C68.1001 12.5001 69.5001 12.5001 69.5001 12.5001C70.0001 11.5001 70.0001 10.4001 69.5001 9.4001H67.0001V5.8001C65.8001 5.2001 64.4001 5.2001 63.1001 5.8001V9.3001H60.9001C60.4001 10.3001 60.4001 11.4001 60.9001 12.4001C60.9001 12.4001 62.3001 12.4001 63.1001 12.4001V20.4001C63.1001 22.7001 64.6001 23.6001 67.5001 23.6001C68.8001 23.6001 69.6001 23.5001 69.6001 23.5001C70.1001 22.6001 70.1001 21.3001 69.6001 20.3001Z"
              fill={color}
            />
          </a>
        ) : null}
      </svg>,
      200,
      { "Content-Type": "image/svg+xml" }
    );
  }
);

app.get(
  "/config",
  cors({ origin: ["https://d.id", "http://localhost:3000"] }),
  async (c) => {
    const { did_c: config } = querySchema.parse(c.req.query());
    const color = config.color || "#000000";

    return c.html(
      <form>
        <label for="color">Color:</label>
        <input type="text" id="color" name="color" value={color} />
        <br />
        <input
          type="button"
          value="Save"
          onClick={`
            parent.postMessage({color:document.querySelector('#color').value}, "*");
          `}
        />
      </form>
    );
  }
);

export default app;
