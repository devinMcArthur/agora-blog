import getBuffer from "@utils/getBuffer";
import AWS from "aws-sdk";
import { GetObjectOutput } from "aws-sdk/clients/s3";
import { ReadStream } from "fs";

const spacesEndpoint = new AWS.Endpoint(
  `${process.env.SPACES_REGION}.digitaloceanspaces.com`
);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
});

const uploadFile = (name: string, body: ReadStream, mimetype: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      s3.putObject(
        {
          Bucket: process.env.SPACES_NAME!,
          Key: name,
          Body: await getBuffer(body),
          ACL: "private",
          ContentType: mimetype,
        },
        (err, data) => {
          if (err) reject(err);
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
          if (err) reject(err);
          else resolve(data);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const removeFile = (name: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      s3.deleteObject(
        {
          Bucket: process.env.SPACES_NAME!,
          Key: name,
        },
        (err, data) => {
          if (err) reject(err);
          resolve(data);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

export { uploadFile, getFile, removeFile };
