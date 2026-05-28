export const ALODOC_CONTRACT_ADDRESS = "0x6eDc6a30D2735E71afDB622026a46343e6dD81fa" as const;

export const alodocLearningProofAbi = [
  {
    type: "function",
    name: "createProfile",
    inputs: [
      { name: "displayName", type: "string" },
      { name: "alodocUsername", type: "string" },
      { name: "xUsername", type: "string" },
      { name: "preferredLanguage", type: "uint8" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "updateProfile",
    inputs: [
      { name: "displayName", type: "string" },
      { name: "alodocUsername", type: "string" },
      { name: "xUsername", type: "string" },
      { name: "preferredLanguage", type: "uint8" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "isProfileCreated",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "isAlodocUsernameAvailable",
    inputs: [{ name: "alodocUsername", type: "string" }],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getProfile",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "displayName", type: "string" },
          { name: "alodocUsername", type: "string" },
          { name: "xUsername", type: "string" },
          { name: "preferredLanguage", type: "uint8" },
          { name: "xp", type: "uint256" },
          { name: "completedCount", type: "uint256" },
          { name: "badgeCount", type: "uint256" },
          { name: "streak", type: "uint256" },
          { name: "lastActiveDay", type: "uint256" },
          { name: "totalScore", type: "uint256" },
          { name: "quizCount", type: "uint256" },
          { name: "createdAt", type: "uint256" },
          { name: "updatedAt", type: "uint256" },
          { name: "exists", type: "bool" }
        ]
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getMyProfile",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "displayName", type: "string" },
          { name: "alodocUsername", type: "string" },
          { name: "xUsername", type: "string" },
          { name: "preferredLanguage", type: "uint8" },
          { name: "xp", type: "uint256" },
          { name: "completedCount", type: "uint256" },
          { name: "badgeCount", type: "uint256" },
          { name: "streak", type: "uint256" },
          { name: "lastActiveDay", type: "uint256" },
          { name: "totalScore", type: "uint256" },
          { name: "quizCount", type: "uint256" },
          { name: "createdAt", type: "uint256" },
          { name: "updatedAt", type: "uint256" },
          { name: "exists", type: "bool" }
        ]
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "completeQuest",
    inputs: [
      { name: "diseaseId", type: "uint256" },
      { name: "score", type: "uint256" },
      { name: "languageUsed", type: "uint8" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "claimBadge",
    inputs: [{ name: "diseaseId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "canClaimBadge",
    inputs: [
      { name: "user", type: "address" },
      { name: "diseaseId", type: "uint256" }
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "hasCompletedQuest",
    inputs: [
      { name: "user", type: "address" },
      { name: "diseaseId", type: "uint256" }
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "hasClaimedBadge",
    inputs: [
      { name: "user", type: "address" },
      { name: "diseaseId", type: "uint256" }
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getCompletedDiseaseIds",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256[]" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getAccuracy",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getUserCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getUsers",
    inputs: [
      { name: "offset", type: "uint256" },
      { name: "limit", type: "uint256" }
    ],
    outputs: [{ name: "", type: "address[]" }],
    stateMutability: "view"
  }
] as const;

export type AlodocProfile = {
  displayName: string;
  alodocUsername: string;
  xUsername: string;
  preferredLanguage: number;
  xp: bigint;
  completedCount: bigint;
  badgeCount: bigint;
  streak: bigint;
  lastActiveDay: bigint;
  totalScore: bigint;
  quizCount: bigint;
  createdAt: bigint;
  updatedAt: bigint;
  exists: boolean;
};
