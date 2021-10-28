export default () => {
  process.env.MONGO_URI =
    "mongodb+srv://devin:chaos1@cluster0.hlyry.mongodb.net/test?retryWrites=true&w=majority";
  process.env.JWT_SECRET = "donttellanyoneaboutthissecretplease";
};
