import { AgoraAPI } from "../AgoraAPI/AgoraAPI";

export class OPDelegate {
  readonly #ethereumAddress: string;
  readonly #agoraAPI: AgoraAPI;

  /**
   * @example
   * Works for ENS addresses
   * ```
   * new OPDelegate('lefteris.eth')
   * ```
   */
  constructor(ethereumAddress: string) {
    this.#ethereumAddress = ethereumAddress;
    this.#agoraAPI = new AgoraAPI();
  }

  public fetchAgoraData = async () => {
    const delegateData = await this.#agoraAPI.fetchDelegate(
      this.#ethereumAddress,
    );
    // Use the ENS name if user provided that
    if (this.#ethereumAddress.includes(".")) {
      delegateData.address = this.#ethereumAddress;
    } // TODO pull ENS name if the user has a primary one setup
    return delegateData;
  };
}
