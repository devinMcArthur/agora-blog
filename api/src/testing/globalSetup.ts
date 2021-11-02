export default () => {
  process.env.MONGO_URI =
    "mongodb+srv://devin:chaos1@cluster0.hlyry.mongodb.net/test?retryWrites=true&w=majority";
  process.env.JWT_SECRET = "donttellanyoneaboutthissecretplease";
  process.env.SPACES_REGION = "sfo3";
  process.env.SPACES_NAME = "agora-dev";
  process.env.SPACES_KEY = "WSSFOK5LKJ5PP5XIHQEA";
  process.env.SPACES_SECRET = "fFtvsxm4rX7QzX09RXLWchJUXb1Uda3bbnJREKTVVH0";
};
