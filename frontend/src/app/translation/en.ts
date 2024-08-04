export default {
  noSongTitle: 'Pony | Music Streamer',
  songTitlePrefix: 'Pony | ',
  songTitleBody: '{{artistName}} - {{songName}} | ',
  installation: {
    mainHeader: 'Installation',
    libraryFoldersLabel: 'Library Folders:',
    libraryFoldersPlaceholder: 'Enter full folder path',
    adminNameLabel: 'Admin name:',
    adminEmailLabel: 'Admin email:',
    adminPasswordLabel: 'Admin password:',
    repeatAdminPasswordLabel: 'Repeat admin password:',
    installationSecretLabel: 'Installation secret:',
    installationSecretPlaceholder: 'Get from file ~/.pony3/installationSecret.txt',
    installButton: 'Install',
  },
  login: {
    mainHeader: 'Sign In',
    emailLabel: 'Email:',
    passwordLabel: 'Password:',
    loginButton: 'Login',
  },
  library: {
    toolbar: {
      refreshButton: 'Refresh',
      systemButton: 'System',
      settingsButton: 'Settings',
      scanningButton: 'Scanning',
      logButton: 'Log',
      usersButton: 'Users',
    },
    log: {
      header: 'Log',
    },
    album: {
      discLabel: 'Disc {{discNumber}}',
      unknownLabel: 'Unknown'
    },
    artist: {
      unknownLabel: 'Unknown'
    },
    song: {
      unknownLabel: 'Unknown'
    },
    noMusicLabel: 'Your library is empty :-(',
    scanStatistics: {
      counts: '{{songCount}} songs, {{artistCount}} artists, {{albumCount}} albums, {{artworkCount}} artworks',
      sizeGigabytes: '{{size}} GB',
      sizeMegabytes: '{{size}} MB',
      date: 'Last scan: {{date}}',
      githubLinkLabel: 'Pony on GitHub',
    },
  },
  player: {
    noSongTitle: 'Pony - Music Streamer',
    songTitle: '{{artistName}} - {{songName}}',
    playbackFailed: 'Playback failed.',
    windowCloseConfirmation: 'Playback will stop after closing the window. Are you sure?',
  },
  scanning: {
    header: 'Scanning',
    statusLabel: 'Status:',
    progressLabel: 'Progress:',
    startScanButton: 'Start Scan',
    startDateColumn: 'Start Date',
    updateDateColumn: 'Update Date',
    statusColumn: 'Status',
    lastMessageColumn: 'Last Message',
    detailsColumn: '',
    detailsButton: 'Details',
    scanJobProgress: {
      inactiveLabel: 'inactive',
      errorLabel: 'could not start scan job :-(',
      startingLabel: 'starting...',
      preparingLabel: 'preparing...',
      searchingMediaLabel: 'searching media...',
      cleaningSongsLabel: 'cleaning songs...',
      cleaningSongsWithProgressLabel: 'cleaning songs: {{percentage}}% ({{itemsComplete}} of {{itemsTotal}} files processed)...',
      cleaningArtworksLabel: 'cleaning artworks...',
      cleaningArtworksWithProgressLabel: 'cleaning artworks: {{percentage}}% ({{itemsComplete}} of {{itemsTotal}} files processed)...',
      importingLabel: 'importing songs...',
      importingWithProgressLabel: 'importing songs: {{percentage}}% ({{itemsComplete}} of {{itemsTotal}} files processed)...',
      searchingArtworksLabel: 'searching artworks...',
      searchingArtworksWithProgressLabel: 'searching artworks: {{percentage}}% ({{itemsComplete}} of {{itemsTotal}} files processed)...',
    },
  },
  scanJob: {
    header: 'Scan Job',
    statusLabel: 'Status:',
    logMessageLabel: 'Log message:',
    targetPathsLabel: 'Target folders:',
    failedPathsLabel: 'Failed folders:',
    processedAudioFilesLabel: 'Processed audio files:',
    scanResultLabel: 'Updates:',
    scanResult: 'created {{createdArtistCount}} artists, \n' +
      'updated {{updatedArtistCount}} artists, \n' +
      'deleted {{deletedArtistCount}} artists, \n' +
      'created {{createdAlbumCount}} albums, \n' +
      'updated {{updatedAlbumCount}} albums, \n' +
      'deleted {{deletedAlbumCount}} albums, \n' +
      'created {{createdGenreCount}} genres, \n' +
      'updated {{updatedGenreCount}} genres, \n' +
      'deleted {{deletedGenreCount}} genres, \n' +
      'created {{createdSongCount}} songs, \n' +
      'updated {{updatedSongCount}} songs, \n' +
      'deleted {{deletedSongCount}} songs, \n' +
      'created {{createdArtworkCount}} artworks, \n' +
      'deleted {{deletedArtworkCount}} artworks.',
    librarySizeLabel: 'Library:',
    librarySize: '{{artistCount}} artists,\n' +
      '{{albumCount}} albums, \n' +
      '{{songCount}} songs, \n' +
      '{{artworkCount}} artworks, \n' +
      '{{genreCount}} genres, \n' +
      '{{duration}}, \n' +
      '{{songSize}} songs,\n' +
      '{{artworkSize}} artworks.',
  },
  userList: {
    header: 'Users',
    creationDateColumn: 'Creation Date',
    updateDateColumn: 'Update Date',
    nameColumn: 'Name',
    emailColumn: 'Email',
    roleColumn: 'Role',
    actionsColumn: 'Actions',
    editButton: 'Edit',
    deleteButton: 'Delete',
    createUserButton: 'Create User',
    deletionConfirmation: 'Are you sure to delete this user?',
    userDeletionNotificationTitle: 'User Deletion',
    userDeletionNotificationFailed: 'Failed!',
  },
  user: {
    editHeader: 'Edit User',
    createHeader: 'Create User',
    nameLabel: 'Name:',
    emailLabel: 'Email:',
    newPasswordLabel: 'New password:',
    repeatNewPasswordLabel: 'Repeat new password:',
    passwordLabel: 'Password:',
    repeatPasswordLabel: "Repeat password:",
    roleLabel: 'Role:',
    newPasswordPlaceholder: 'Leave empty to keep old password',
  },
  currentUser: {
    header: 'My Profile',
    nameLabel: 'Name:',
    emailLabel: 'Email:',
    oldPasswordLabel: 'Old password:',
    newPasswordLabel: 'New password:',
    newPasswordPlaceholder: 'Leave empty to keep old password',
    repeatNewPasswordLabel: 'Repeat new password:',
  },
  settings: {
    header: 'Settings',
    libraryFoldersLabel: 'Library Folders:',
    libraryFoldersPlaceholder: 'Enter full folder path',
    startScanJobConfirmation: 'Library folders updated. Do you want to start scan now?',
  },
  shared: {
    errorsHeader: 'Errors',
    loadingIndicatorLabel: 'Loading...',
    errorIndicatorLabel: 'Operation failed!',
    previousPageButton: '&laquo; Previous',
    nextPageButton: 'Next &raquo;',
    dateTimeFormat: 'yyyy-MM-dd hh:mm:ss',
    currentPageLabel: 'Page {{pageIndex}} of {{totalPages}}',
    creationDateLabel: 'Creation Date:',
    updateDateLabel: 'Update Date:',
    cancelButton: 'Cancel',
    saveButton: 'Save',
    scanJob: {
      startingStatus: 'STARTING',
      startedStatus: 'STARTED',
      completeStatus: 'COMPLETE',
      failedStatus: 'FAILED',
      interruptedStatus: 'INTERRUPTED',
    },
  },
  notification: {
    authenticationErrorTitle: 'Authentication Error',
    authenticationErrorText: 'Please sign in.',
    authorizationErrorTitle: 'Authorization Error',
    authorizationErrorText: 'Access denied.',
    scanJobTitle: 'Scan Job',
    scanJobStartedText: 'Running...',
    scanJobInterruptedText: 'Interrupted!',
    scanJobFinishedText: 'Complete!',
    scanJobFailedText: 'Failed!',
    settingsTitle: 'Settings',
    settingsUpdatedText: 'Updated!',
  },
  fieldViolation: {
    // Localized field violation messages can be defined here (code-message pairs).
  },
  error: {
    // Localized error messages can be defined here (code-message pairs).
  }
};
