FROM oven/bun:latest
COPY . .
RUN bun install
RUN bun run build
ENTRYPOINT [ "./bin/matz" ]

