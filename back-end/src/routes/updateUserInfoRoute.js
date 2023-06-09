import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";

export const updateUserInfoRoute = {
  path: "/api/users/:userId",
  method: "put",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;

    const updates = ({ favoriteFood, hairColor, bio }) =>
      ({ favoriteFood, hairColor, bio }(req.body));

    if (!authorization) {
      return res.status(401).json({ message: "No Authorization header sent" });
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) res.status(401).json({ message: "Unable to verify token" });

      const { id, email } = decoded;

      if (id !== userId)
        res
          .status(403)
          .json({ message: "Not allowed to update that Users data" });

      const db = getDbConnection("spravker");
      const result = await db
        .collection("users")
        .findOneAndUpdate(
          { email },
          { $set: { userInfo: updates } },
          { returnDocument: "after" }
        );

      const { isEmailVerified, userInfo } = result.value;

      jwt.sign(
        { id, email, isEmailVerified, userInfo },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        async (err, token) => {
          if (err) return res.status(500).json(err);

          return res.status(200).json({ token });
        }
      );
    });
  }
};
