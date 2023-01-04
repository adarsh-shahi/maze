const { Engine, Render, Runner, World, Bodies } = Matter;

const engine = Engine.create();
const { world } = engine;

const width = 600;
const height = 600;

const render = Render.create({
	element: document.body,
	engine,
	options: {
		wireframes: true,
		width,
		height,
	},
});

Render.run(render);
Runner.run(Runner.create(), engine);

// *Walls
const walls = [
	// left
	Bodies.rectangle(0, height / 2, 50, height, {
		isStatic: true,
	}),

	// top
	Bodies.rectangle(width / 2, 0, width, 50, {
		isStatic: true,
	}),

	// right
	Bodies.rectangle(width, height / 2, 50, height, {
		isStatic: true,
	}),

	// bottom
	Bodies.rectangle(width / 2, height, width, 50, {
		isStatic: true,
	}),
];

World.add(world, walls);
