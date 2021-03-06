// lecture3 - STEP2. 다양한출력지원

class todoProgram {

  constructor() { // 변수 생성하기
    this.taskList = [];
    this.id = 1;
    this.status = ['todo', 'doing', 'done'];
  }

  newLine() { // 한줄띄어쓰는 함수
    console.log(``);
  }

  startTime() { // 시작하는 시간을 가져오는 함수
    return new Date().getTime();
  }

  overTime(startTime) { // 끝나는 시간에서 시작하는 시간을 빼는 함수
    return new Date().getTime() - startTime;
  }

  printStatus() { // 현재상태를 출력하는 함수
    this.doneCount = 0;
    this.doingCount = 0;
    this.todoCount = 0;
    for (let task of this.taskList) {
      const { status } = task;
      if (status === 'todo') this.todoCount++;
      if (status === 'doing') this.doingCount++;
      if (status === 'done') this.doneCount++;
    }
    console.log(`현재상태 : todo:${this.todoCount}개,  doing:${this.doingCount}개, done:${this.doneCount}개`);
  }

  printUpdate(id, name, situation) { // 변경사항을 출력하는 함수
    console.log(`id: ${id},  "${name}" ${situation}`);
  };

  add({ name, tag }) { // 새로운 항목을 추가하는 함수
    this.taskList.push({
      name: name,
      tag: tag,
      id: this.id,
      status: 'todo'
    })
    this.printUpdate(this.id, name, '항목이 새로 추가됐습니다.');
    this.printStatus();
    this.id++;
    this.newLine();
  }

  update(nowStatus) { // 현재상태를 갱신 하는 함수
    let newStatus = nowStatus.nextstatus.toLowerCase();
    let oldStatus;
    let taskName;

    for (let task of this.taskList) {
      if (task.id === nowStatus.id) {
        taskName = task.name;
        oldStatus = task.status;
        task.status = newStatus;
        if (task.status === 'doing') task.startTime = this.startTime();
        if (task.status === 'done') task.overTime = this.overTime(task.startTime);
      }
    }
    this.printUpdate(nowStatus.id, taskName, `항목이 ${oldStatus} => ${newStatus} 상태로 업데이트 됐습니다.`);
    this.printStatus();
    this.newLine();
  }

  remove(existing) { // 기존 항목을 삭제하는 함수
    let existingLecture;
    for (let task of this.taskList) {
      if (task.id === existing.id) {
        existingLecture = task;
        this.taskList.splice(this.taskList.indexOf(task), 1);
      }
    }
    this.printUpdate(existingLecture.id, existingLecture.name, '삭제완료.');
    this.printStatus();
    this.newLine();
  }

  printTasks(status, taskCount, statusArr, overTime) { // 호출하는 할일들을 출력하는 함수
    console.log(`[ ${status} , 총${taskCount}개 ]`);
    for (let i = 0; i < taskCount; i++) process.stdout.write(`- ${statusArr[i].id}번, ${statusArr[i].name}`);
    if (status === 'done') console.log(`, ${overTime} ms`);
    this.newLine();
  }

  showTag(tag) { // 태그를 입력 받아 태그와 일치하는 할일을 모두 출력하는 함수
    let sortTaskArr = [[], [], []]; // todo, doing, done
    let overTime;

    for (let task of this.taskList) {
      if (task.tag === tag) {
        switch (task.status) {
          case 'todo':
            sortTaskArr[0].push(task);
            break;
          case 'doing':
            sortTaskArr[1].push(task);
            break;
          case 'done':
            sortTaskArr[2].push(task);
            overTime = task.overTime;
            break;
        }
      }
    }
    for (let i = 0; i < 3; i++) this.printTasks(this.status[i], sortTaskArr[i].length, sortTaskArr[i], overTime);
  }

  pushTasks(tagsArray, sortTask) { // 태그가 맞으면 sortTask의 맞는 인덱스에 push
    this.taskList.forEach(function (task) {
      let tagBool = tagsArray.indexOf(task.tag);
      if (tagBool !== -1) {
        sortTask[tagBool].push(task);
      }
    });
  }

  showTags() { // 태그가 있는 모든 할일을 tag기준으로 출력
    let tagsArray = [];
    let sortTask = [];
    this.findTags(tagsArray, sortTask);
    this.pushTasks(tagsArray, sortTask);
    for (let i = 0; i < tagsArray.length; i++) {
      console.log(`[ ${tagsArray[i]} , 총${sortTask[i].length}개 ]`);
      for (let j = 0; j < sortTask[i].length; j++) {
        process.stdout.write(`- ${sortTask[i][j].id}번, ${sortTask[i][j].name}, [${sortTask[i][j].status}]`);
        if (sortTask[i][j].status === 'done') console.log(` ${sortTask[i][j].overTime} ms`);
        else console.log('');
      }
      this.newLine();
    }
  }


  show(status, call, taskCount) { // staus를 입력받아 해당하는 할일을 모두 출력
    let LowerCaseStatus = status.toLowerCase();
    if (call === 'status') console.log(`[ ${status} , 총${taskCount}개 ]`);
    for (let task of this.taskList) {
      if (task.status === LowerCaseStatus) {
        process.stdout.write(`- ${task.id}번, ${task.name}, [${task.tag}]`);
        if (status === 'done') console.log(` ${task.overTime} ms`);
        else console.log('');
      }
    }
    this.newLine();
  }

  printShowAll(status, allTaskCount, delayTime) { // 지연할 시간과 총 리스트의 개수, status를 출력하는 함수 
    if (status === 'todo') return console.log(`"총 ${allTaskCount}개의 리스트를 가져왔습니다. ${delayTime}초뒤에 ${status}내역을 출력합니다....."`);
    else console.log(`"지금부터 ${delayTime}초뒤에 ${status}내역을 출력합니다...."`);
  }

  taskCountFuc(status) { // status가 일치하는 task의 개수를 카운트
    let taskCount = 0;
    for (let task of this.taskList) {
      if (task.status === status) {
        taskCount++;
      }
    }
    return taskCount;
  }

  showAll() { //  모든 리스트를 상태를 기준으로 지연출력.
    let i = 0;
    let delayTime = [2, 3, 2];

    let recursion = (i) => {
      let taskCount = this.taskCountFuc(this.status[i]);
      if (i > 2) return;
      this.show(this.status[i], 'status', taskCount);
      i++;
      if (this.status[i] !== undefined) this.printShowAll(this.status[i], this.taskList.length, delayTime[i]);
      setTimeout(() => recursion(i), 1000 * delayTime[i]);
    }
    this.printShowAll(this.status[i], this.taskList.length, delayTime[i]);
    setTimeout(() => recursion(i), 1000 * delayTime[i]);
  }
}

const todo = new todoProgram();
todo.add({ name: "자기", tag: "rest" });
todo.add({ name: "자기", tag: "rest" });
todo.add({ name: "자바스크립트공부", tag: "programming" });
todo.update({ id: 2, nextstatus: "doing" });
todo.add({ name: "ios공부", tag: "programming" });
todo.add({ name: "자바공부", tag: "programming" });
todo.add({ name: "안드로이드공부", tag: "programming" });
todo.update({ id: 1, nextstatus: "doing" });
todo.update({ id: 3, nextstatus: "doing" });
todo.update({ id: 3, nextstatus: "doNe" });

todo.show('todo');
todo.show('doing');
todo.show('done');
todo.showAll();