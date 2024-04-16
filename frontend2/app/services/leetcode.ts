"use client";

import { LeetCode, MatchedUser } from "leetcode-query";

class LeetcodeService {
  private leetcode;
  private userDetails: MatchedUser | null;

  constructor() {
    this.leetcode = new LeetCode();
    this.userDetails = null;
  }

  async getUserData(username: string) {
    const user = await this.leetcode.user(username);
    this.userDetails = user.matchedUser;
    return this.userDetails;
  }

  async getFullName(username: string) {
    if (!this.userDetails) {
      await this.getUserData(username);
    }
    return this.userDetails?.profile?.realName;
  }
}

const leetcodeService = new LeetcodeService();

export default leetcodeService;
