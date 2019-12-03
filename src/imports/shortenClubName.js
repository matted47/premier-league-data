function shortenClubName(club) {
  const clubNames = {
    'Arsenal FC': 'Arsenal',
    'Aston Villa FC': 'Aston Villa',
    'AFC Bournemouth': 'Bournemouth',
    'Brighton & Hove Albion FC': 'Brighton',
    'Burnley FC': 'Burnley',
    'Chelsea FC': 'Chelsea',
    'Crystal Palace FC': 'Crystal Palace',
    'Everton FC': 'Everton',
    'Leicester City FC': 'Leicester City',
    'Liverpool FC': 'Liverpool',
    'Manchester City FC': 'Man City',
    'Manchester United FC': 'Man Utd',
    'Newcastle United FC': 'Newcastle',
    'Norwich City FC': 'Norwich',
    'Sheffield United FC': 'Sheffield Utd',
    'Southampton FC': 'Southampton',
    'Tottenham Hotspur FC': 'Tottenham',
    'Watford FC': 'Watford',
    'West Ham United FC': 'West Ham',
    'Wolverhampton Wanderers FC': 'Wolves'
  };

  if (clubNames.hasOwnProperty(club)) {
    return clubNames[club];
  } else {
    return club;
  }
}

export default shortenClubName;