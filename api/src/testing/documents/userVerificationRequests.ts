import {
  UserVerificationRequest,
  UserVerificationRequestDocument,
} from "@models";
import _ids from "@testing/_ids";

export interface ISeededUserVerificationRequests {
  verificationRequested_request: UserVerificationRequestDocument;
}

const createUserVerificationRequests = () => {
  return new Promise<ISeededUserVerificationRequests>(
    async (resolve, reject) => {
      try {
        const verificationRequested_request = new UserVerificationRequest({
          user: _ids.users.verificationRequested._id,
        });

        const userVerificationRequests = {
          verificationRequested_request,
        };

        for (
          let i = 0;
          i < Object.values(userVerificationRequests).length;
          i++
        ) {
          await Object.values(userVerificationRequests)[i].save();
        }

        resolve(userVerificationRequests);
      } catch (e) {
        reject(e);
      }
    }
  );
};

export default createUserVerificationRequests;
