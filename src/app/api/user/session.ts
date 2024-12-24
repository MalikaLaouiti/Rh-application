import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"; // Example using next-auth

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        // Retrieve session details
        const session = await getSession({ req });
        console.log("Fetching user data for session:", session);
        if (!session) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // You can fetch additional user details from your database here
        const user = {
            id: session.user.id, // Assuming session contains `user.id`
            email: session.user.email, // Assuming session contains `user.email`
            name: session.user.name,
        };
        console.log("Fetching user data for session:", user);
        return res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user session:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
