// lecture3 - STEP1. 기본기능 구현

class todoProgram {

  // 변수 생성하기
  constructor() {
    this.task = [];
    this.id = 1;
  }

  // 한줄띄어쓰는 함수
  newline() {
    console.log(``);
  }

  // 현재상태를 출력하는 함수
  printNow() {
    this.doneCount = 0;
    this.doingCount = 0;
    this.todoCount = 0;
    for (let keys of this.task) {
      const { status } = keys;
      if (status === 'todo') this.todoCount++;
      if (status === 'doing') this.doingCount++;
      if (status === 'done') this.doneCount++;
    }
    console.log(`현재상태 : todo:${this.todoCount}개,  doing:${this.doingCount}개, done:${this.doneCount}개`);
  }

  // 변경사항을 출력하는 함수
  printUpdate(id, name, situation) {
    console.log(`id: ${id},  "${name}" ${situation}`);
  };

  // 새로운 할일을 추가하는 함수
  add({ name, tag }) {
    this.task.push({
      name: name,
      tag: tag,
      id: this.id,
      status: 'todo'
    })
    this.printUpdate(this.id, name, '항목이 새로 추가됐습니다.');
    this.printNow();
    this.id++;
    this.newline();
  }

  // 현재상태를 갱신 하는 함수
  update(nowStatus) {
    let oldStatus;
    let newStatus = nowStatus.nextstatus.toLowerCase();
    let name;

    for (let keys of this.task) {
      if (keys.id === nowStatus.id) {
        name = keys.name;
        oldStatus = keys.status;
        keys.status = newStatus;
      }
    }
    this.printUpdate(nowStatus.id, name, `항목이 ${oldStatus} => ${newStatus} 상태로 업데이트 됐습니다.`);
    this.printNow();
    this.newline();
  }

  // 기존 할일을 삭제하는 함수
  remove(existing) {
    let existingLecture;
    for (let keys of this.task) {
      if (keys.id === existing.id) {
        existingLecture = keys;
        this.task.splice(this.task.indexOf(keys), 1);
      }
    }
    this.printUpdate(existingLecture.id, existingLecture.name, '삭제완료.');
    this.printNow();
    this.newline();
  }

  // 호출하는 할일들을 출력하는 함수
  printTasks(status, taskCount, statusArr) {
    console.log(`[ ${status} , 총${taskCount}개 ]`);
    for (let i = 0; i < taskCount; i++) console.log(`- ${statusArr[i].id}번, ${statusArr[i].name}`);
    this.newline();
  }
  // [ todo , 총2개 ]
  // - 13번, 자바스크립트공
  // - 17번, iOS공부

  // [ done , 총1개 ]
  // - 21번, closure공부 1일 23분


  // 태그를 입력 받아 태그와 일치하는 할일을 모두 출력하는 함수
  showTag(tag) {
    let status = ['todo', 'doing', 'done'],
      statusArr = [[], [], []];

    for (let keys of this.task) {
      if (keys.tag === tag) {
        switch (keys.status) {
          case 'todo':
            statusArr[0].push(keys);
            break;
          case 'doing':
            statusArr[1].push(keys);
            break;
          case 'done':
            statusArr[2].push(keys);
            break;
        }
      }
    }
    for (let i = 0; i < 3; i++) this.printTasks(status[i], statusArr[i].length, statusArr[i]);
  }
  // todo.showTag('programming');  // programming 태그와 일치하는  task 출력
  // [ todo , 총2개 ]
  // - 13번, 자바스크립트공부
  // - 17번, iOS공부

  // [ done , 총1개 ]
  // - 21번, closure공부 1일 23분

  showTags() { // 태그가 있는 모든 할일을 tag기준으로 출력

    // showTags();
    // [ programming , 총2개 ]
    // - 13번, 자바스크립트공부, [todo]
    // - 17번, iOS공부, [doing]

    // [ play , 총1개 ]
    // - 18번, 여행가기, [doing]
  }

  show(status) { // staus를 입력받아 해당하는 할일을 모두 출력

    // todo.show(" Doing ");
    // - 13번, 자바스크립트공부, [programming]
    // - 17번, iOS공부, [programming]
    // - 18번, 여행가기, [play]
  }

  showAll() { //  모든 리스트를 상태를 기준으로 지연출력.

    // todo.showAll();
    // "총 7개의 리스트를 가져왔습니다. 2초뒤에 todo내역을 출력합니다....."
    // [ todo , 총3개 ]
    // - 13번, 자바스크립트공부, [programming]
    // - 17번, iOS공부, [programming]
    // - 18번, 여행가기, [play]

    // "지금부터 3초뒤에 doing내역을 출력합니다...."
    // [ doing , 총2개 ]
    // - 14번, 블로그쓰기, [other]
    // - 10번, 알고리즘공부

    // "지금부터 2초뒤에 done내역을 출력합니다....."
    // [ done , 총2개 ]
    // - 20번, 휴대폰수리, [other], 1시간1분
    // - 21번, closure공부, [programming], 1일 23분
  }
}

const todo = new todoProgram();
todo.add({ name: "자기", tag: "rest" });
todo.update({ id: 1, nextstatus: "doing" })
todo.add({ name: "놀기", tag: "rest" });
todo.add({ name: "쉬기", tag: "rest" });

todo.showTag('rest');  // programming 태그와 일치하는  task 출력