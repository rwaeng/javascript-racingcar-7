class GameController {
  constructor(carModel, view) {
    this.carModel = carModel;
    this.view = view;
    this.numberOfAttempts = 0;
  }

  async startRace() {
    await this.setCarNames();
    await this.setNumberOfAttempts();
    this.view.printMessage('실행 결과');

    while (this.numberOfAttempts > 0) {
      this.carModel.moveCars();
      this.view.printRaceStatus(this.carModel.carMap);
      this.numberOfAttempts -= 1;
    }

    const winner = this.carModel.findWinner();
    this.view.printWinner(winner);
  }

  async setCarNames() {
    const names = await this.view.getCarNames();
    this.validateCarName(names);
    this.carModel.setCarNames(names);
  }

  validateCarName(names) {
    if (names === '') {
      throw new Error('[ERROR] 자동차 이름을 입력하세요.');
    }

    const carNames = names.split(',');
    carNames.forEach(name => {
      if (name.length > 5) {
        throw new Error('[ERROR] 자동차 이름은 5글자 이하여야 합니다.');
      }
    });
  }

  async setNumberOfAttempts() {
    const number = await this.view.getNumber();
    this.validateNumber(number);
    this.numberOfAttempts = number;
  }

  validateNumber(number) {
    if (!Number.isNaN(number)) {
      if (!Number.isInteger(Number(number))) {
        throw new Error('[ERROR] 횟수는 정수로 입력해야 합니다.');
      }
      if (number < 1) {
        throw new Error('[ERROR] 횟수는 1번 이상이어야 합니다.');
      }
    }
  }
}

export default GameController;