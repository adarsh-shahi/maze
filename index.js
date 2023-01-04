const { Engine, Render, Runner, World, Bodies } = Matter;

const engine = Engine.create();
const { world } = engine;

const cells = 3; // 3 * 3 (horizontal = 3 & vertical = 3) = 9
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

// * Maze Generation

const shuffle = (arr) => {
	let counter = arr.length;

	while (counter > 0) {
		const index = Math.floor(Math.random() * counter);
		counter--;

		const temp = arr[counter];
		arr[counter] = arr[index];
		arr[index] = temp;
	}
  return arr
};

let grid = Array(cells)
	.fill(null)
	.map(() => {
		return Array(cells).fill(false);
	});

// for (let i = 0; i < 3; i++) {
// 	grid.push([]);
// 	for (let j = 0; j < 3; j++) {
// 		grid[i].push(false);
// 	}
// }

let verticals = Array(cells)
	.fill(null)
	.map(() => {
		return Array(cells - 1).fill(false);
	});

let horizontals = Array(cells - 1)
	.fill(null)
	.map(() => {
		return Array(cells).fill(false);
	});

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const stepTroughCell = (row, column) => {
	// if already visited the cell at [row, column], then return
	if (grid[row][column]) return; // already visited return

	// mark cell as visited
	grid[row][column] = true;

	// assemble randomly-ordered list of neighbours
	const neighbours = shuffle([
		[row - 1, column],
		[row, column + 1],
		[row + 1, column],
		[row, column - 1],
	]);

};

stepTroughCell(startRow, startColumn);
