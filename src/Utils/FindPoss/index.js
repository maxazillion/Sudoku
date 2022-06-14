


function findPoss(numbers) {
  let ret = [[], [], [], [], [], [], [], [], []];
  let horizontalNoGo = [];
  let verticalNoGo = [[], [], [], [], [], [], [], [], []];
  let blockNoGo = [[],[],[],[],[],[],[],[],[]];
  let blockCounterOuter = 0;
  let blockCounterInner = 0;

  numbers.forEach((row, index) => {
    horizontalNoGo.push([]);
    row.forEach((num, subIndex) => {
      ret.push([]);
      if (num !== 0) {
        horizontalNoGo[index].push(num);
        verticalNoGo[subIndex].push(num);
        blockNoGo[blockCounterInner + blockCounterOuter].push(num)
      }
      if((subIndex + 1) % 3 === 0){
        blockCounterInner += 1;
      }
    });
    blockCounterInner = 0;
    if((index + 1) % 3 === 0){
      blockCounterOuter += 3
    }

  });

  let horizontalCount = 0;

  blockCounterInner = 0;
  blockCounterOuter = 0;
  ret.forEach((arr, index) => {
    for (let i = 1; i < 10; i++) {
      if (verticalNoGo[index % 9].includes(i) === false &&
        horizontalNoGo[horizontalCount].includes(i) === false &&
        blockNoGo[blockCounterInner + blockCounterOuter].includes(i) === false
      ) {
        ret[index].push(i);
      }
    }
    if((index + 1) % 9 === 0 && index !== 0 && horizontalCount !== 8) {
      horizontalCount++;
    }


    if((index + 1) % 3 === 0){
      blockCounterInner += 1;
    }
    if(blockCounterInner >= 3){
      blockCounterInner = 0;
    }

    if((index + 1) % 27 === 0){
      blockCounterOuter += 3;
    }
    if(blockCounterOuter >= 9){
      blockCounterOuter = 0;
    }
  });

  return ret;
}

export default findPoss;
