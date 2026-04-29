import { useEffect, useState } from "react";

export function Goblin({ centerTilePosition }) {
  const [monsterSpriteCol, setMonsterSpriteCol] = useState(0);
  const [monsterState, setMonsterState] = useState("walkingLeft");
  const [monsterSquarePosition, setMonsterSquarePosition] = useState({
    x: 3,
    y: 0,
  });
  const viewPortSize = 64;
  const ANIMATIONSPEED = 120; // milliseconds (animation speed)
  const TILE_SIZE = 64;
  const MAP_SIZE = 640;
  const walkingSpeed = 300;

  const monsterStateInfo = {
    walkingDown: { frameCount: 5, row: 0 },
    attackDown: { frameCount: 5, row: 0 },
    walkingRight: { frameCount: 5, row: -1 },
    attackRight: { frameCount: 5, row: -1 },
    walkingUp: { frameCount: 5, row: -2 },
    attackUp: { frameCount: 5, row: -2 },
    walkingLeft: { frameCount: 5, row: -3 },
    attackLeft: { frameCount: 5, row: -3 },
    dead: { frameCount: 5, row: -4 },
  };

  const absoluteMonsterPosition = () => {
    console.log(monsterSquarePosition.x);
    console.log(centerTilePosition.x);
    const dxTiles = monsterSquarePosition.x - centerTilePosition.x;
    const dyTiles = monsterSquarePosition.y - centerTilePosition.y;

    const dxPixels = dxTiles * TILE_SIZE;
    const dyPixels = dyTiles * TILE_SIZE;

    console.log("dxTiles:", dxTiles, "dyTiles:", dyTiles);
    console.log("dxPixels:", dxPixels, "dyPixels:", dyPixels);

    const pos = { x: dxPixels, y: dyPixels };

    console.log("pos:", pos); // 👈 HERE

    return pos;
  };
  const pos = absoluteMonsterPosition();

  useEffect(() => {
    const interval = setInterval(() => {
      setMonsterSpriteCol(
        (prev) => (prev - 1) % monsterStateInfo[monsterState].frameCount,
      );
    }, ANIMATIONSPEED);

    return () => clearInterval(interval);
  }, [monsterState]);

  // const handleMapClick = (e) => {
  //   const rect = e.currentTarget.getBoundingClientRect();

  //   const x = e.clientX - rect.left;
  //   const y = e.clientY - rect.top;

  //   const tileX = Math.floor(x / TILE_SIZE);
  //   const tileY = Math.floor(y / TILE_SIZE);

  //   const clickedTile = { x: tileX, y: tileY };

  //   console.log("tile:", tileX, tileY);
  //   const path = getShortestPath(monsterSquarePosition, clickedTile);
  //   walkPath(path);
  // };

  // function getShortestPath(start, goal) {
  //   const size = MAP_SIZE / TILE_SIZE; // 10

  //   const queue = [[start]];
  //   const visited = new Set();

  //   const key = (p) => `${p.x},${p.y}`;

  //   while (queue.length > 0) {
  //     const path = queue.shift();
  //     const current = path[path.length - 1];

  //     if (current.x === goal.x && current.y === goal.y) {
  //       return path;
  //     }

  //     if (visited.has(key(current))) continue;
  //     visited.add(key(current));

  //     const neighbors = [
  //       // orthogonal moves
  //       { x: current.x + 1, y: current.y },
  //       { x: current.x - 1, y: current.y },
  //       { x: current.x, y: current.y + 1 },
  //       { x: current.x, y: current.y - 1 },

  //       // diagonal moves
  //       { x: current.x + 1, y: current.y + 1 },
  //       { x: current.x + 1, y: current.y - 1 },
  //       { x: current.x - 1, y: current.y + 1 },
  //       { x: current.x - 1, y: current.y - 1 },
  //     ];

  //     for (const n of neighbors) {
  //       if (n.x >= 0 && n.y >= 0 && n.x < size && n.y < size) {
  //         queue.push([...path, n]);
  //       }
  //     }
  //   }

  //   return [];
  // }

  // function walkPath(path) {
  //   let i = 0;

  //   const interval = setInterval(() => {
  //     if (i >= path.length) {
  //       clearInterval(interval);

  //       // idle after movement
  //       setMonsterState("rightIdleNoWeapon");
  //       return;
  //     }

  //     const current = path[i];
  //     const next = path[i + 1];

  //     setMonsterSquarePosition(current);

  //     // 🎯 set animation based on direction
  //     if (next) {
  //       const dx = next.x - current.x;
  //       const dy = next.y - current.y;

  //       if (dx === 1) setMonsterState("rightWalkNoWeapon");
  //       else if (dx === -1) setMonsterState("leftWalkNoWeapon");
  //       else if (dy === 1) setMonsterState("downWalkNoWeapon");
  //       else if (dy === -1) setMonsterState("upWalkNoWeapon");
  //     }

  //     i++;
  //   }, walkingSpeed);
  // }

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
          width: viewPortSize,
          height: viewPortSize,
          backgroundSize: "auto", // or try "contain" for testing
          imageRendering: "pixelated",
          backgroundImage: "url('/goblin.png')",
          backgroundPosition: `${monsterSpriteCol * viewPortSize}px ${
            monsterStateInfo[monsterState].row * viewPortSize
          }px`,
          backgroundRepeat: "no-repeat",
        }}
      />
    </>
  );
}

export default Goblin;
