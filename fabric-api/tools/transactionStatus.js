var eNum = {
    VALID: 0,
    NIL_ENVELOPE: 1,
    BAD_PAYLOAD: 2,
    BAD_COMMON_HEADER: 3,
    BAD_CREATOR_SIGNATURE: 4,
    INVALID_ENDORSER_TRANSACTION: 5,
    INVALID_CONFIG_TRANSACTION: 6,
    UNSUPPORTED_TX_PAYLOAD: 7,
    BAD_PROPOSAL_TXID: 8,
    DUPLICATE_TXID: 9,
    ENDORSEMENT_POLICY_FAILURE: 10,
    MVCC_READ_CONFLICT: 11,
    PHANTOM_READ_CONFLICT: 12,
    UNKNOWN_TX_TYPE: 13,
    TARGET_CHAIN_NOT_FOUND: 14,
    MARSHAL_TX_ERROR: 15,
    NIL_TXACTION: 16,
    EXPIRED_CHAINCODE: 17,
    CHAINCODE_VERSION_CONFLICT: 18,
    BAD_HEADER_EXTENSION: 19,
    BAD_CHANNEL_HEADER: 20,
    BAD_RESPONSE_PAYLOAD: 21,
    BAD_RWSET: 22,
    ILLEGAL_WRITESET: 23,
    INVALID_WRITESET: 24,
    NOT_VALIDATED: 254,
    INVALID_OTHER_REASON: 255
}

module.exports = {
    /**
     * @async
     * @param {String} value Status in string format
     * @returns Int status value
     */
    async  getTransactionStatusInt (value) {
    return eNum[value];
    },
    /**
     * @async
     * @param {Number} value Status code in integer 
     * @returns Status value i n string format
     */
    async  getTransactionStatusString(value){
        switch(value){
          case 0:
            return "VALID";
          case 1:
            return "NIL_ENVELOPE";
          case 2:
            return "BAD_PAYLOAD";
          case 3:
            return "BAD_COMMON_HEADER";
          case 4:
            return "BAD_CREATOR_SIGNATURE";
          case 5:
            return "INVALID_ENDORSER_TRANSACTION";
          case 6:
            return "INVALID_CONFIG_TRANSACTION";
          case 7:
            return "UNSUPPORTED_TX_PAYLOAD";
          case 8:
            return "BAD_PROPOSAL_TXID";
          case 9:
            return "DUPLICATE_TXID";
          case 10:
            return "ENDORSEMENT_POLICY_FAILURE";
          case 11:
            return "MVCC_READ_CONFLICT";
          case 12:
            return "PHANTOM_READ_CONFLICT";
          case 13:
            return "UNKNOWN_TX_TYPE";
          case 14:
            return "TARGET_CHAIN_NOT_FOUND";
          case 15: 
            return "MARSHAL_TX_ERROR";
          case 16:
            return "NIL_TXACTION";
          case 17:
            return "EXPIRED_CHAINCODE";
          case 18:
            return "CHAINCODE_VERSION_CONFLICT";
          case 19:
            return "BAD_HEADER_EXTENSION";
          case 20:
            return "BAD_CHANNEL_HEADER";
          case 21:
            return "BAD_RESPONSE_PAYLOAD";
          case 22:
            return "BAD_RWSET";
          case 23:
            return "ILLEGAL_WRITESET";
          case 24:
            return "INVALID_WRITESET";
          case 254:
            return "NOT_VALIDATED";
          case 255:
            return "INVALID_OTHER_REASON";
          default:
            return "INVALID_STATUS"
        }
      }
}