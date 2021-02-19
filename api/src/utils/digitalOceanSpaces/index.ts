import AWS from "aws-sdk";
import { GetObjectOutput } from "aws-sdk/clients/s3";

const spacesEndpoint = new AWS.Endpoint(
  `${process.env.SPACES_REGION}.digitaloceanspaces.com`
);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
});

const uploadFile = (name: string, body: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      s3.putObject(
        {
          Bucket: process.env.SPACES_NAME!,
          Key: name,
          Body: body,
          ACL: "private",
        },
        (err, data) => {
          if (err) throw err;
          else resolve(data);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const getFile = (name: string) => {
  return new Promise<GetObjectOutput>(async (resolve, reject) => {
    try {
      s3.getObject(
        {
          Bucket: process.env.SPACES_NAME!,
          Key: name,
        },
        (err, data) => {
          if (err) throw err;
          else resolve(data);
        }
      );
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

export { uploadFile, getFile };

export default s3;
