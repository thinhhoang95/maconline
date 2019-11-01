import Team, { Score } from '../model/team';

// teamInfo must be a JavaScript object, preferably parsed JSON
export const newTeam = async (teamInfo) => {
    let team = new Team(teamInfo);
    await team.save();
    return new Promise((resolve)=>resolve(0));
}

export const newScore = async (id, referee, scoreInfo) => {
    let team = await Team.findById(id);
    Object.keys(scoreInfo).forEach((field) => {
        let score = new Score({
            referee: referee,
            value: Number(scoreInfo[field])
        });
        team[field].push(score);
    });
    console.log(team);
    await team.save();
    return new Promise((resolve) => resolve(0));
}

export const deleteScore = async (id, referee) => {
    await Team.findByIdAndUpdate(id, { 
        fCompletionTime: { $pullAll: {referee: referee } },
        dropDistance: { $pullAll: { referee: referee } },
        dCompletionTime: { $pullAll: { referee: referee } }
    });
    return new Promise((resolve) => resolve(0));
}

export const showAllTeams = async() => {
    const aggregateRules = [
        {
            '$unwind': {
                'path': '$fCompletionTime',
                'includeArrayIndex': '_id2',
                'preserveNullAndEmptyArrays': true
            }
        }, {
            '$group': {
                '_id': '$_id',
                'fCompletionTime': {
                    '$avg': '$fCompletionTime.value'
                },
                'rfCompletionTime': {
                    '$push': '$fCompletionTime.referee'
                },
                'dropDistance': {
                    '$first': '$dropDistance'
                },
                'dCompletionTime': {
                    '$first': '$dCompletionTime'
                },
                'teamName': {
                    '$first': '$teamName'
                },
                'teamMembers': {
                    '$first': '$teamMembers'
                },
                'acType': {
                    '$first': '$acType'
                }
            }
        }, {
            '$unwind': {
                'path': '$dropDistance',
                'includeArrayIndex': '_id3',
                'preserveNullAndEmptyArrays': true
            }
        }, {
            '$group': {
                '_id': '$_id',
                'dropDistance': {
                    '$avg': '$dropDistance.value'
                },
                'rdropDistance': {
                    '$push': '$dropDistance.referee'
                },
                'fCompletionTime': {
                    '$first': '$fCompletionTime'
                },
                'rfCompletionTime': {
                    '$first': '$rfCompletionTime'
                },
                'dCompletionTime': {
                    '$first': '$dCompletionTime'
                },
                'teamName': {
                    '$first': '$teamName'
                },
                'teamMembers': {
                    '$first': '$teamMembers'
                },
                'acType': {
                    '$first': '$acType'
                }
            }
        }, {
            '$unwind': {
                'path': '$dCompletionTime',
                'includeArrayIndex': '_id4',
                'preserveNullAndEmptyArrays': true
            }
        }, {
            '$group': {
                '_id': '$_id',
                'dCompletionTime': {
                    '$avg': '$dCompletionTime.value'
                },
                'rdCompletionTime': {
                    '$push': '$dCompletionTime.referee'
                },
                'fCompletionTime': {
                    '$first': '$fCompletionTime'
                },
                'rfCompletionTime': {
                    '$first': '$rfCompletionTime'
                },
                'rdropDistance': {
                    '$first': '$rdropDistance'
                },
                'dropDistance': {
                    '$first': '$dropDistance'
                },
                'teamName': {
                    '$first': '$teamName'
                },
                'teamMembers': {
                    '$first': '$teamMembers'
                },
                'acType': {
                    '$first': '$acType'
                }
            }
        }
    ];
    let teams = await Team.aggregate(aggregateRules);
    return new Promise((resolve) => resolve(teams));
}

export const queryScore = async (id, referee) => {

}