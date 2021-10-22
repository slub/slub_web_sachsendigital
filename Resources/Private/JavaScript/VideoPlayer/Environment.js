/**
 * Encapsulates various global state. Construct an instance of this at the root
 * of the app and inject / pass it down to the places where it is needed.
 *
 * This allows us, for example, to use fresh `mkid` counters in test cases.
 */
export default class Environment {
  constructor() {
    this._idCnt = 0;
  }

  /**
   * Generates an identifier that is unique with respect to this Environment.
   *
   * It may be used, for example, to link an <input /> element to a <label />,
   * or to group radio boxes.
   */
  mkid() {
    return `__autoid_${++this._idCnt}`;
  }
}
