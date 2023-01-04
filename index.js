const { Engine, Render, Runner, World, Bodies } = Matter;

const engine = Engine.create();
const { world } = engine;

const cells = 3; // 3 * 3 (horizontal = 3 & vertical = 3) = 9
const width = 600;
const height = 600;

const unitLength = width / cells

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
	Bodies.rectangle(0, height / 2, 2, height, {
		isStatic: true,
	}),

	// top
	Bodies.rectangle(width / 2, 0, width, 2, {
		isStatic: true,
	}),

	// right
	Bodies.rectangle(width, height / 2, 2, height, {
		isStatic: true,
	}),

	// bottom
	Bodies.rectangle(width / 2, height, width, 2, {
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
	return arr;
};

const grid = Array(cells)
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

const verticals = Array(cells)
	.fill(null)
	.map(() => {
		return Array(cells - 1).fill(false);
	});

const horizontals = Array(cells - 1)
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
		[row - 1, column, "up"],
		[row, column + 1, "right"],
		[row + 1, column, "down"],
		[row, column - 1, "left"],
	]);

	// for rach neighbour
	for (let neighbour of neighbours) {
		const [nextRow, nextColumn, direction] = neighbour;

		//see if that neighbour is out of bounds
		if (
			nextRow < 0 ||
			nextRow >= cells ||
			nextColumn < 0 ||
			nextColumn >= cells
		) {
			continue;
		}

		// if we have visited that neighbour, continue to next neighbour
		if (grid[nextRow][nextColumn]) continue;

		// remove a wall from either horizontals or verticals
		if (direction === "left") verticals[row][column - 1] = true;
		else if (direction === "right") verticals[row][column] = true;
		else if (direction === "up") horizontals[row - 1][column] = true;
		else if (direction === "down") horizontals[row][column] = true;

    stepTroughCell(nextRow, nextColumn)
	}
};

stepTroughCell(startRow, startColumn);

horizontals.forEach(( row , rowIndex) => {
  row.forEach((open, columnIndex) => {
    if(!open){

      //* horizontal call creation
      const widthDistance = columnIndex * unitLength + unitLength / 2
      const heightDistance = (rowIndex * unitLength) + unitLength
      const horizontalWall = Bodies.rectangle(widthDistance, heightDistance, unitLength, 10, {
        isStatic: true
      })
      World.add(world, horizontalWall)
    }
  })
})

verticals.forEach(( row , rowIndex) => {
  row.forEach((open, columnIndex) => {
    if(!open){

      //* vertical call creation
      const heightDistance = (rowIndex * unitLength) + unitLength / 2
      const widthDistance = unitLength * columnIndex + unitLength  
      const verticalWall = Bodies.rectangle(widthDistance, heightDistance, 10, unitLength, {
        isStatic: true
      })
      World.add(world, verticalWall)
    }
  })
})

const goal = Bodies.rectangle(
  width - unitLength / 2,
  height - unitLength / 2,
  unitLength * .7,
  unitLength * .7, {
    isStatic: true
  }
)
World.add(world, goal)