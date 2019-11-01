import mongoose from 'mongoose';

const ScoreSchema = new mongoose.Schema({
    referee: String,
    value: Number
});

let TeamSchema = new mongoose.Schema({
    teamName: String,
    teamMembers: String,
    acType: Number,
    fCompletionTime: [ScoreSchema],
    dropDistance: [ScoreSchema],
    dCompletionTime: [ScoreSchema]
});

export const Score = mongoose.model('score', ScoreSchema);

export default mongoose.model('team', TeamSchema);