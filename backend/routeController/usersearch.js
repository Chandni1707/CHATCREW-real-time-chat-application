import User from "../models/userModels.js"; 
import Conversation from "../models/conversation.js";
export const getUserBySearch = async (req, res) => {
    try {
        const search= req.query.search || ""  ;
       const currentUserId = req.user._id;  
       const users = await User.find({
        $and   :[  {
                 $or: [
                    { username: { $regex: '.*' + search + '.*', $options: "i" } },
                    { fullname: { $regex: '.*' + search + '.*', $options: "i" } }
        ]},
                 { _id: { $ne: currentUserId } }
             ]
       }).select("-password").select("-email");
       res.status(200).send(users);
       

         
    }
 catch (error) {
    res.status(500).send({ 
        status: false,
        message: "Server error" 
    });
    console.error(error);
}
};



export const getCurrentChatUser = async (req, res) => {
    try {
        const currentUserId = req.user._id;

        const currentchatuser = await Conversation.find({
            members: currentUserId
        }).sort({ updatedAt: -1 });

        if (!currentchatuser || currentchatuser.length === 0) 
            return res.status(200).send([]);

        const participantsIDS = currentchatuser.reduce((ids, conversation) => {
            const otherUser = conversation.members.filter(
                id => id.toString() !== currentUserId.toString()
            );
            return [...ids, ...otherUser];
        }, []);

        const otheruserids = participantsIDS.filter(
            id => id.toString() !== currentUserId.toString()
        );

        const usersData = await User.find({ _id: { $in: otheruserids } })
            .select("-password")
            .select("-email");

        const users = otheruserids.map(id =>
            usersData.find(u => u._id.toString() === id.toString())
        );

        res.status(200).send(users);

    } catch (error) {
        res.status(500).send({
            status: false,
            Message: "Server error"
        });
        console.error(error);
    }
};