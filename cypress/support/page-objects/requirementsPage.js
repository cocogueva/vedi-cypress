import utils from "../utils/utils";

class requirementsPage {
  static acceptButton = ".box-requirements > .row > :nth-child(1) > .btn";
  static declineButton = "button.btn-outline-primary.btn-block";

  static acceptRequirements() {
    utils.selectButton(this.acceptButton);
  }

  static declineRequirements() {
    utils.selectButton(this.declineButton);
  }
}

export default requirementsPage;