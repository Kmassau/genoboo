import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

import logger from '/imports/api/util/logger.js';
import { ROLES } from '/imports/api/users/users.js';

import { genomeCollection, genomeSequenceCollection } from '/imports/api/genomes/genomeCollection.js';
import { Genes } from '/imports/api/genes/geneCollection.js';

import { ExperimentInfo, Transcriptomes } from '/imports/api/transcriptomes/transcriptome_collection.js';

export function addTestUsers() {

  // Register user roles
  ROLES.forEach((roleName, i) => {
    const role = Meteor.roles.findOne({ _id: roleName });
    if (!role) {
      Roles.createRole(roleName);
    }
    if (i > 0 && (!role || !role.children.length)) {
      Roles.addRolesToParent(ROLES[i - 1], roleName);
    }
  });

  // Add default users
  const adminId = Accounts.createUser({
    username: 'admin',
    password: 'admin',
  });
  Roles.addUsersToRoles(adminId, 'admin');

  const newUserId = Accounts.createUser({
    username: 'baseUser',
    email: 'user@user.user',
    password: 'user'
  });

  Roles.addUsersToRoles(newUserId, 'registered');

  const curatorId = Accounts.createUser({
    username: 'curator',
    email: 'curator@user.user',
    password: 'user'
  });

  Roles.addUsersToRoles(curatorId, 'curator');

  return { adminId, newUserId, curatorId }
}

export function addTestGenome(annot=false) {

  const genomeId = genomeCollection.insert({
    name: "Test Genome",
    permission: 'admin',
    description: 'description',
    organism: 'organism',
    isPublic: false,
  });

  const genomeSeqId = genomeSequenceCollection.insert({
    header: 'B1',
    seq: 'GTATTCTAAACTATCGCTCAAGTACATGTACATCATTATAATATTTAACAATTAATTTAGTTTAAATTCAAAATAAATAAGTGGATAAACCTCTATGAAATCACATTATCTAGAGAAAATGAGACAACAAAGGTTCCTAACCTTTTACCATCATATAATATGTAAGTCGAGGATAACCATGAAATGAAAAAATATTGTCTTATTTTTTGAATTATTATTTGTAGGTTAACCCCTACTAAAATAATGAGTTTTGTTAAATGCTCTATATAATGAAGCTTATACTTTTTAGTGATGTTTAAAATATTTAACCACTTTCTAAATTTGTATTTATGTATTCTAAACTATCTTTCATGGTACATGTAACATCATTATTATTTTTAACAATTATTTATTAAATTCAAATACCGCTTAAATAAGTGGATAAACCTCTATGATATCACTATTATCTAGAGAAAATGAGACAAAAAAAGTTACAAACCTCTTTTACCATCATAATATGTGGAGGATGCAACTATGAAATAAAAAATATTGTCATATTTTTTAATTTCACTAAAATTTTGTAGGTTAACCCCTACAAAATAATGAGTTTTGGTTAAATGTTATATATACTAAAGCTTATACTCTTTAGTGATGTTTAAAAATAAGTAACCACTTTCATTTGTATTGATATATTCTAAACTATCTTTTTACATGTACATCATTCTTTAACAATTAATATAGTTTAATTTCATAAACTGCTTAAATAATTAGATTAACCACTATGAAATCCCAATTATCTAGAGAAAATGAGACAACAATGGTTCCTAACCTCTTTTAACATCATAATATGCAGTGGAGGATACAACTATGAAATTAAAAAATATTGTCATATTTTTTGAATTTCACTCAAAATTTGTAGGTTAACCCCTACCTAAAATATTGAGCTTTTTTGTTAAATGCTCTATATACTGAAGCTAATACACTTTAGTGATGTTTGCAAATATTTAACCACTTTCTACATTTGTATTGATGTATTCTAAACTATCTTTCAAGGTACATGTACATCATTCTAATTTTTAACAATTAATTTAGTTTAAATTCATATACTGCTTAAATAAGTGGATAAACCTCTATGAAATCACAATTATCTAGAGAAAATGAGACAACAAAGGTTCCTAACCTCTTTTACCATCATAATATGTAAGTGGAGGATGCAACTATGAAATAAAAAAATATTGTCATATTTTTTGAATTTCACTCAAAATTTGTAGGTTAACCCCCTACCTAAAAATAATGAGTTTTTGGTTAAATGATCTATATGCTAAAGCTTATACTCTTTAGTGATGTTTAAAAATATTTAACCACTTTCTACATTTGTATTGATGTATTCTAAACTATCTTTCAAGGTACATGTACATCATTCTAATTTTTAACAATTAATTTAGTTTAAATTCATATACTGCTTAAATAATTAGATTAACCACTGTGAAATCACTATTATCTAGAGAAAATGAGACAACAAAGGTTTCTAACCTCTTTTACCATCATAATATGTAAGTGGAGGATGAAACTATGAAATAAAAAAATATTGTCATATTTTTTGAATTTCACTCAAAATTTGTAGGTTAACCCCTATGAAAATAATGAGTTTTTGGTTAAATGCTCTATATACTGAAGCTAATACACTTTAGTGATGTTTACAAATATTTAACCACTTTCTACATTTGTATTGATGTATTCAAAATTATCTTTCAAGGTACATGTACGTCATTCTAATTTTTACCAAAAAATTTAGTTTGAATTCAAATACTTCTTAAATAATTAGATTAACCACTATGAAATCACTATTATCTAGAGAAACTGAGACAACAAAGGTTCCTAATCTCTTTTACCATCATACTATGTAAGTGGAGGATGCAACTATGAAATAAAAAAATATTGTCATATTTTTTTAATTTCACTCAAAATTTGTAGGTTAACCCCTACGAAAATAATGAGTTTTTGGTTAAATGTTCTATATACTAAAGCTTATACTCTTTAGTGATGTTTAAAAATATTTAACCACTTTCTACATTTGTATTGATATATTCTAAACTATGTTTTAAGGTACATGTACATCATTCTAATTTTTAACAATTAATTTAGTTTAAATTCATATACTGCTTAAATAATTAGATTAACCACTATGAAATCCCTATTATCTAGAGAAACTGAAACAACAAAGGTTCCTAATCTCTTTTACCATCATACTATGTAAGTAGATGATGCAACTATGAAATAAAAAAATATTGTCATATTTTTTTAATTTCACTCAAAATTTGTAGGTTAACCCCTACGAAAATTATGAGTTTTTGGTTAAATTCTCTATATACTGAAGCTTATACTCTTTAGTGATGTTTAAAAATATTTAACCACTTTCTACATTTGTATTGATGTATTCTAAACTATCTTTCAAGGTACATGTACATCATTATAATTTTAACAATTAATTTAGTTTAAATTCATATATTGCTTAAATAATTAGATTAACCAATCTGAAATCACTATTATCGAGAGAAAATGAGACAACAAAGGTTCTTAACCTCTTTTACCATCATAATATGTAAGTGGAGGATGCAACTATGAAATAAAAAAATATTGTCATATTTTTTTGAATTTCACTCAAAATTTGTAGGTAACCCCTACAAATATAATGAGTTTTTGGTTAAATGATCTATATACTGAAGTTTATACTCTTTAGTGATGTTTAAAAATATTTAACCACTTTCTAAATTTGTATTGATGTATTCTAAACTATCTTTCAATGTACATGTACATCATTATAATTTTTAACAATTAATTTAGTTTAAATTCAAATACTGCTTAAATAAGTGGATAAACCTCTATGAAATCACTATTATCTAGAGAAAATGAGACAACAAAGGTTCCTAACCTCTTTTACCATCATAATATGTAAGTGGAGGATGAAACTATGAAATAAAAAAATATTGTCATATTTTTTGAATTTCACTCAAAATTTGTAGGTTAACCCCTACTAAAATAATGAGTTTTTGGTTAAATGCTCTATATACTGAAGCTTATACTCTTTAGTGATGTTTAAAAATATTTAACCACTTTCTACATTTGTATTGATGTATTCTAAACTATCTTTCAAGGTACATGTACATCATTCTAATTTTTAACAATTAATTTAGTTTAAATTCATATACTGCTTAAATAATTAGATTAACCACTATGAAATCACTATTATCTAGAGAAAATGAGACAACAAAGGTTCCTAACCTCTTTACCATCATAATATGTAAGTGGAGGATGCAACTATGAAATAAAAAATAGTCATATTTTTGAATTTCACTCAAAATTTGTAGGTTAACCCCTACAAAAATAATGAGTTTTTGTTAAATGTCATATATAATGAAGCTTATACTCTTTAGTGATGTTTAAAAATATTTAACCACTTTCTAAATTTGTATTGATGTATTCTAAACTATCTTTCATGGTACATGTACATCATTATTATTTTTAACAATTAATTTAGTTTAAATTCAAATACTGCTTAAATAAGTGGATAAACCTCTATGATATCACTATTATCTAGAGAAAATGAGACAACAAAGGTTCCTAACCTCTTTTACCATCATAATATGTAATTGGAGGATGAAACTATGAAATAAAAAAATATTGTCATATTTTCTGAATTTCACTCAAAATTTGTAGGTTAACCCCTACTTAAAATAATGAGTTTTTGTTAAATGCTCTATATACTGAAGCTTATACTCTTTAGTGATGTTTAAAAATATTTAACCACTTTCTACATTTTTATTGATGTATTCTAAACAATCTTTCAAGGTACATGTACATCATTCTAATTTTTTACAATTAATTTAGTTTAAATTCATATACTGCTTAAATAAGTGGATAAACCTCTATGAAATCACAATTATCTAGAGAAAATGAGACAAAAAAGGTTCCTAACCTATTTTACCATCATAACATGTAAGTGGAGGATGCAACTATGAAATAAAAAAATATTGTCATAATTTTTGAATTACACTCAAAATTTGTAGGTTAACCCCTACGAAAATAATGAGTTTTTGGTTAAATGCTCTATATACTGAAGCTTATACTCTTTAGTGATGTTTAAATATATTTACCCACTTTCTAAATTTGTATTGATGTATTCTAAACTATCTTTCAAGGTACATGTACATCATTATAATTTTTAACAATTAATTTAGTTTAAATTCAAATACTGCTTAAATAAGTGGATAAACCTCTATGAAATCACTATTATCTAGAGAAAATGAGACAACAAAGGTTCCTAACCTCTTTTACCATCATAATATGTAAGTGGAGGATGCAACTATGAAATAAAAAAATATTGTCATATTTTTTGAATTTCACTCAAAATTTGTAGGTTAACCCCTACGAAAATAATGAGTTTTTGGTTAAATGCTCTATATACTGAAGCTAATACACTTTAGTGATGTTTACAAATATTTAACCACTTTCTACATTTGTATTGATGTATTCAAAATTATCTTTCAAGGTACATGTACGTCATTCTAATTTTTAACAATTAATTTAGTTTAAATTCATATACTGCTTAAATAATTAGATTAACCACTACGAAATCTCTATTATCTAGAGAAAATGAGACAACAATGGTTCCTAACATCTTTTAACATCATAATATGCAGTGGAGGATACAACTATGAAATAAAAAAATATTGTCATATTTTTTGAATTTCACTCAAAATTTGTAGGTTAACCCCTACGAAAATATTGAGTTTTTGGTTAAATGCTCTATATACTGAAGCTAATACACTTTAGTGATGTTTACAAATATTTAACCACTTTCTAAATTTGTATTGATGTATTCAAAACTATCTTTCAAGGTACATGTACGTCATTCTAATTTTTACCAAAAAAATTTGTTTGAATCAAATACTTCTTAAATAATTAGATTAACCACTATGAAACCACTATTATCTAGAGAAACTGAGACAACAAAGGTTCCTAACCTCTTTTACCATCATACTATGTAAGTTGAGGATGCAACTATGAAATAAAAAAATATTGTCATATTTTTTAAATTTCACTCAAAATTTGTAGGTTAACCCCTATGAAAATAATGAATTTTTGGTTAAATGATCTATATACTGAAGCTTATACTCTTTAGTGATGTTTAAAAATATTTAACCACTTTCTACATTTGTATTGATGTATTCTATACTATCTTTCAAGGTACATGTACATCATTCTAATTTTTAACAATTAATTTAGTTTAAATTCATATATTGCTTTAATAATTAGATTAACCACTGTGAAATCACTATTATCTACAGAAAATGAGACAACAAAGGTTCCTAACCTCTTTTACCATCATAATATGTAAGTGGAGGATGCAACTATGAAATAAAAAAATATTTTCATATTTTTTGAATTTCACTCAAAATTTGTAGGTTAACTAACTCTTACGAAAATATTGAGTTTTTTAAAATGCTCTATATACTGAAGCTTATACTCTTTAGTATTGTTTAAAAATATTTAACCACTTTCTACATATGTATTAGTTTATTCTAAACCATCTTTCAAGGCACATGTACATCATTCTAACTTTTAACAGTTAATTTAGTTTAAATTCATTTACTGCTTAAATAAGTAGACTAACCACTATGAAATCACTATTATCTAGAGAAAATGAGACAACAAAGGTTCCTAACCTATTTTACCATCATAACATGTAAGTGGAGGATGCAACTATGAAATAAAAAAATATTGTCATAATTTTTGAATTACACTCAAAATTTGTAGGTTAACCCCTACGAAAATAATGAGTTTTTGGTTAAATGTTCTATATACTAAAGCTTATACTCTTTAGTGATGTTTAAAAATAAGTAACCACTTTCATTTGTATTGATATATTCTAAACTATCTTTTAAGGTACATGTACATCATTCTAATTTTTAACAATTAATTTAGTTTAATTTCATAAACTGCTTAAATAATTAGATTAACCACTATGAAATCCCAATTATCTAGAGAAAATGAGACAACAATGGTTCCTAACCTCTTTTAACATCATAATATGCAGTGGAGGATACAACTATGAAATTAAAAAATATTGTCATATTTTTTGAATTTCACTCAAAATTTGTAGGTTAACCCCTACGAAAATATTGAGTTTTTTGTTAAATGCTCTATATACTGAAGCTAATACACTTTAGTGATGTTTACATATATTTAACCACTTTCTACATTTGTATTGATGTATTCTAAACTATCTTTCAAGGTACATGTACATCATTCTAATTTTTAACAATTAATTTTTTTTAAATTCATATACTGCTTAAATAAGTGGATAAACCTCTATGAAATCACAATTATCTAGAGAAAATGAGACAAAAAAGGTTCCTAACCTCTTTTACCATCATAATATGTAAGTGGAGGATGCAACTATGAAATAAAAAATATTGTCATATTTTTTGAATTTCACTCAAAATTTGTAAGTTAACCCCTACGAAAATAATGAATTTTTGGTTAAATGATCTATATGCTGAAGCTTATACTCTTTAGTGATGTTTAAAAATATTTAACCACTTTCTACATTTGTATTCATGTATTCTAAACTATCTTTCAAGGTACATGTACATCATTCTAATTTTTAACTATTAATTTAGTTTAAATTCATATACTGCCTTAATAATTAGATTAACCACTGTGAAATCACTATTATCTAGAGAAAATGAGACAACAAAGGTTCCTAACCTCTTTTACCATCATAATATGTAAGTGGAGGATGAAACTATGAAATAAAAAAATATTGTCATATTTTTTGAATTTCACTCAAAATTTGTAGGTTAACCCCTACGAAAATAATGAGTTTTTGGTTAAATGCTCTATATACTGAAGCTAATACACTTTAGTGATGTTTACAAATATTTAACCACTTTCTACAATTGTATTGATGTTTTCAAAATTATCTTTCAAGGTACATGTACGTCATTCAAATTTTTACCAAAATATTTAGTTTGAATTCCAATGCTGCTTAAATAATTAGATTAACCACTGTGAAATCACTATTATCTACAGAAAATGAGACAACAAAGGTTCCTAACCTCTTTTACCATCATAATATGTAAGTGGAGGATGCAACTATGAAATAAAAAAATATTGTCATATTTTTTTGAATTTCACTCAAAATTTGTAGGTTAACCCCTACGAAAATAATGAGTTTTTGGTTAAATGCTCTATATACTGAAGCTTATACTCTTTAGTGATGTTTAAATATATTTAACCACTTTCTACATTTGTATTGATGTATTCTAAACTATCTTTCAAGGTACATGTACATCATTCTAATTTTTAACAATTAATTTAGTTTAAATTCATATACTGCTTAAATAATTAGATTAACCACTATGAAATCCCTATTATCTAGAGAAACTGAAACAACAAAGGTTCCTAATCTCTTTTACCATCATACTATGTAAGTAGATGATGCAACTATGAAATAAAAAAATATTGTCATATTTTTTTAATTTCACTCAAAATTTGTAGGTTAACCCCTACGAAAATTATGAGTTTTTGGTTAAATTCTCTATATACTGAAGCTTATACTCTTTAGTGATGTTTAAAAATATTTAACCACTTTCTACATTTGTATTGATGTATTCTAAACTATCTTTCAAGGTACATGTACATCATTCTAATTTTTAACAATTAATTTAGTTTAAATTCATATATTGCTTAAATAATTAGATTAACCACTCTGAAATCACTATTATCGAGAGAAAATGAGACAACAAAGGTTATTAACCTCTTTTACCATCATAATATGTAAGTGGAGGATGCAACTATGAAATAAAAAAATATTGTCATATTTTTTGAATTTCACTCAAAATTTGTAGGTAACCCCTACAAATATAATGAGTTTTTGGTTAAATGATCTATATACTGAAGTTTATACTCTTTAGTGATGTTTAAAAATATTTAACCACTTTCTAAATTTGTATTGATGTATTCTAAACTATCTTTCAATGTACATGTACATCATTATAATTTTTAACAATTAATTTAGTTTAAATTCAAATATTGCTTAAATAAGTGGATAAACCTCTATGAAATCACTATTATCTAGAGAAAATGAGACAACAAAGGTTCCTAACCTCTTTTACCATCATAATATGTAAGTGGAGGATGAAACTATGAAATAAAAAAATATTGTCATATTTTTTGAATTTCATTCAAAAATTGTAGGTTAACCCCTACGAAAATAATGAGTTTTTGGTTAAATGCTCTATATACTGAAGCTTATACTCTTTAGTGATGTTTAAAAATATTTAACCACTTTTTATATTTGTATTGATGTATTCTAAACTATCTTTCAAGGTACATGTACATCATTCTAATTTTTAACAATTAATTTAGTTTAAATTCATATACTGCTTAAATAATTAGATTAACCACTATGAAATCACTATTATCTAGAGAAAATGAGACAACAAAGGTTCCTAACCTCTTTTACCATCATAATATGTAAGTGGAGGATGCAACTATGAAATAAAAAAATAGTCATATTTTTTGAATTTCACTCAAAATTTGTAGGTTAACCCCTACAAAAATAATGTGTTTTTTGTTAAATGCTGTATATAATGAAGCTTATACTCTTTAGTGATGTTTAAAAATATTTAACCACTTTCTAAATTTGTATTGATGTATTCTAAACTATCTTTCATGGTACATGTACATCTTTATTATTTTTAACAATTAATTTAGTTTAAATTCAAATACTGCTTAAATAAGTGGATAAACCTCTATGATATCACTATTATCTAGAGAAAATGAGACAACAAAGGTTCCTAACCTCTTTTACCATCATAATATGTAATTGGAGGATGAAACTATGAAATAAAAAAATATTGTCATATTTTCTGAATTTCACTCAAAATTTGTAGGTTAACCCCTACGAAAATAATGAGTTTTTTGTTAAATGCTCTATATACTGAAGCTTATACTCTTTAGTGATGTTTAAAAATATTTAACCACTTTCTACATTTTTATTGATGTATTCTAAACTATCTTTCAAGGTACATGTACATCATTCTAATTTTTAACAATTAATTTAGTTTAAATTCATATACTGCTTAAATAAGTGGATAAACCTCTATGAAATCACAATTATCTAGAGAAAATGAGACAAAAAAGGTTCCTAACCTATTTTACCATCATAACATGTAAGTGGAGGATGCAACTATGAAATAAAAAAATATTGTCATAATTTTTGAATTACACTCAAAATTTGTAGGTTAACCCCTACGAAAATAATGAGTTTTTGGTTAAATGCTCTATATACTGAAGCTTATACTCTTTAGTGATGTTTAAATATATTTAACCACTTTCTACATTTGTATTGATGTATTCTAAACTATCTTTCAAGGTACATGTACATCATTATAATTTTTAACAATTAATTTAGTTTAAATTCAAATACTGCTTAAATAAGTGGATAAACCTCTATGAAATCACTATTATCTAGAGAAAATAAGACAACAAAGGTTCCTAACCTCTTTTACCATCATAATATGTAAGTGGAGGATGCAACTATGAAATAAAAAATATTGTCATATTTTTTGAATTTCACTCAAAATTTGTAGGTTAACCCCTACGAAAATAATGAGTTTTTGGTTAAATGCTCTATATACTGAAGCTAATACACTTTAGTGATGTTTACAAATATTTAACCACTTTCTACATTTGTATTGATGTATTCAAAATTATCTTTCAAGGTACATGTACGTCATTCTAATTTTTAACAATTAATTTAGTTTAAATTCATATACTGCTTAAATAATTAGATTAACCACTACGAAATCTCTATTATCTAGAGAAAATGAGACAACAATGGTTCCTAACATCTTTTAACATCATAATATGCAGTGGAGGATACAACTATGAAATAAAAAAATATTGTCATATTTTTTGAATTTCACTCAAAATTTGTAGGTTAACCCCTACGAAAATATTGAGTTTTTGGTTAAATGCTCTATATACTGAAGCTAATACACTTTAGTGATGTTTACAAATATTTAACCACTTTCTACATTTGTATTGATGTATTCAAAACTATCTTTCAAGGTACATGTACGTCATTCTAATTTTTACCAAAAAATTTAGTTTGAATCAAATACTTCTTAAATAATTAGATTAACCACTATGAAATCACTATTATCTAGAGAAACTGAGACAACAAAGGTTCCTAACCTCTTTTACCATCATACTATGTAAGTGGAGGATGCAACTATGAAATAAAAAATATTGTCATATTTTTTGAATTTCACTCAAAATTTGTAGGTTAACCCCTAAGAAAATAATGAGTTTTTGGTTAAATGATCTATATGCTGAAGCTTATACTCTTTAGTGATGTTTAAATATATTTACCCACTTTCTACATTTGTATTGATGTATTCTAAACTATCTTTCAAGGTACATGTACATCATTCTAATTTTTAACAATTAATTTAGTTTAAATTCATATACTGCTTTAATAATTAGATTAACCACTGTGAAATCACTATTATCTACAGAAAATGAGACAACAAAGGTTCCTAACCTCTTTTACCATCATAATATGTAAGTGGAGGATGCAACTATGAAATAAAAAAATATTTTCATATTTTTTGAATTTCACTCAAAATTTGTAGGTTAACTAACTCTTACGAAAATATTGAGTTTTTTAAAATGCTCTATATACTGAAGCTTATACTCTTTAGTATTGTTTAAAAATATTTAACCACTTTCTACATATGTATTAGTTTATTCTAAACCATCTTTCAAGGCACATGTACATCATTCTAACTTTTAACAGTTAATTTAGTTTAAATTCATTTACTGCTTAAATAAGTAGACTAACCACTATGAAATCACTATTATCTAGAGAAAATGAGACAACAAAGGTTCCTAACCTCTTTTACCATCATAATATTTAAGTGGAGGATGAAACTATGAAATAAAAAAATATTGTCATATTTTTGAATTTCACTCAAAATTTGTAGGTTAAATGCTCTATATATTGAATCTTATACTCTTTAGTGTTGTTTAAAAATATTTAACCACATTCTGCATTTGTATTAATATATTCTAAACTATCTTTCAAGGTACGTGCACATCATTCTAATTTTCAACAATTACTTTAGTTTAAATTCATATACTGCTTAAATAAGTGGACTAACCACTATGAAATCACTATTATCTAGAGAAACGGAGACAACAAAGATTCCTAACCTTTTTGACCATCATAATATGTAAGTGGACGATGCAACTATGTAATAAAAAAATATTGTCAAATTTTTTGAATTTCACTCAAAATATGTAGGTTAACTAACCCTTACGAAAATATTGAGTTTTGTTAAATGCTCTATATACTGAAGCTTACACTCTTTAGTATTGTTTAAAAATATTTAACCACATTCTACATATGTATTAATTTATTCTAAACCATCTTTCAAGGCACATGTACATCATTCTAACTTTTAACAGTTAATTTAGTTTAAATTCATTTACTGCTTAAATAAGTGGACTAACCACTATGAAATCACTATTATGTAGAGAAACAGAGACAACAAAGGTTCCTTACCTCTTTGATCATCATAATATGTAAGTGGAGGATGCAATTATGCAATAAAACAATATTGTCGTTTTTTTTTTAATTTCACTCAAGATAACCCCTACGAAAATTTTGAGTTTTTTGTTAAATGTTCTATATACTGAAATTTATACTCTTTAGTGTCATTTAAAAATATTTAACAACATTCTACATTTGTATTAATATATTCTAAAATATCTTTCAAGGTACATGTACATCATTCTAAGTTTTAACAATTAATTTAGTTTAAATTCATATACTCCTTAAATAAGTGGACTAACCACTATGAATTCACTGTTATCTAGAGAAACAGACACAACAAATGTTCCTAACCCCTTTGACCATCATAATATGTAAGTGGAGGATAAAACTATGCAATAAAACAATATTGTCATATTTTTTTAATTTCACTCAAAGAGGTTTAATTATCTTTGTTTTTGCCGTTTATCTAGATAATAAAGATTTTTTAGTGGTTAGTCCACTCATTTAAGAAATATATGAAGTTTTTGGTAGGATCCAAAGGTGTCCACTGGTTATACCTGAAGCTAGCTGTTAAACCATTTTTAACCTGGCACCACATGAATCGCTCAGCGAGGCAGAGCAGTTTGAGAAGAGATTTCCAGATCCATGATCCTTGCAAGGTTTCCTCAAGGCTCAATTAACTCATCCCTTTTAACTGATGATGCTTACACCAGAAGCCCATAGGGATACATTCTCATTATGCAGGATCCAGATTAGCTTCAGAGATAGAGTTTTGTTCCATAACTGAAAATCCCATAAGCTTAAACCTCCTTCAGACTTTGGCATACAACAATTTTCCCAAGATACTCTCGCTGCAGTCCTTGACGTTATGTTTCCGTTTCAGAGAAAACAACAGCATAGAGATTCCACTTACGCGATGCACCCTTTAGGTAAGATAAAGCTCGAGAACCAGAAGTTGAGAGTATCATTGATGACGGAAGATATCAATTGTCTCCGACCAGCAAAAGATAGAGTAAGGACCAGGAGGAGAATCACAATCTTAGGTTATCACACATCGGTCTGTAGTCCCAAATCCTTAGTTTCCGTTGCATAAGAGGTAATCTCAAATATCTGACCGGAAGTGAACCGATAGATAATCCAAGGCTATTCATCTCAATAGTTTCTTCATGGTTCAGTCCCGACAAGAAAAGCTCAGTTTTGTTGCGGTTCATTGAGAGGCCGGACCAAGTAGCAAAGCACTTGAGAATGACTGAGATATTTCAGAGAGAAGCATATTGACCATAAAGAAGATCATGATATCATAGGCGAAAGCAAGATGAGAGACAAAAGGGTTTAAAGCTGTAGGATGAAAACCTATATGACTAGAGTCATACTCCTTGTGTTTAGCATCTGTGAGAAGACTTCCATATCAAGGACAAAAATATAATGAGACAAAGGATCCCTTGCCGCAATCTTCTTGTGCCCTTGAAGTACCCACATAATTCATCATTGATTTCTATAGAGAACCGAGTCGTGGAGATGCACTGGGGTTAACCTATATATTTCGTTATTCTCATTGCAGAAACAGAAACAAATATTCTCATTGAAAGGCTCATATTTCGTATCCAATATTTTCTGTCTCTGGAATTAACCCCTTGAAATGAGGACAGTGAGTAAAAGTCATTGTCCTTAGGTATCGTAAGTGAGAAGAGAGAGAGAGACTTGATAAATTCTTGTAGGTATTATTTGAGTTTAGACAGTGTATGTTACTCTTGAAGTTGACAAAATATCGTTTTCAGAGGTTGTTTGCCCGTAATCTAGCCATTTGTGTTCAGTAGCTTCATTTTACGGTAAAAAGAAGCAATGTTTAAAAATCGGTATGAGGTACGATCTCCCACTACATTGACACACGGGAGTAGCATAACGGCAATCAATCAGAAAAGAAAAAATAACAAAAAAAAGGAAAGGGTAAAACAAAAAAACAAGGCTATCCTGTCTCTAAGATTCCTGCTGTTGCCGCGATGAGTTGTTTATATAGGAGCCTAGAGCTGGCTATTCTGTTGATGAGGAAGTGGTGGTGGTGGTCTCCTGTTTTTGGTCGCCAAAGACACGTTGACGGAAATCTTTGACCATAAGAGGGAGTCCTTGGCGGAGAGCCACCTTTGGTTCCCAACCAAGAAGCTCTTTGGCCTTTGTTATGTCTGGTTTCCTCTTGTGTGGGTCATCCTCCGTGTTTGGTCTAAACTCAATCTTTGCGTTGGGGTCTATCGTCTCTTGAACCACCTGCGCACCCCCCCCACATTCACTCATTATACATACACAAAAGACTTTTTGAGAGAAATCCTAAACAGGATACTAGACTAGAGAGAGAGAGAGAGAGACCTTAGCGAGCTCGAGCATGGTGAATTCACTAGGGTTACCAAGGTTAAATGGGCCAACATGTTCTCCTTCCATCAACCTCATCAAACCCTCCACCTAAAATCACATTCAAGTTTACCAATTCTCAATCAACAACAATCCAATATTATAATGTGTTGGCAAATCTGAAGCAGTAGGGCGGGGTACAATGAAACAAACGGACATTTCGATTGCTTTGATTTAAGGAGGAAAAAGGGGTAATACCAGATCAGAGACAAACTGGAAGCTCCTGGTCTGCTTACCGTCGCCATAAACAGTCAATGGCTCTTTTCTTAAAGCCTGCACCCACCCAAATGACATTACCATTCCATAACACTTTTAACTCACAAGTCATCCTATAGTCCATTTATGGCAGTTGGCATGACTCTGTAATATATAAAAATAAAATCTTAATTACCTGAGCAACGAAGTTGCTAACCACACGGCCATCATCAATACACATCCTTGGCCCATAAGTATTGAAGATCCGAGCTATTCTAACCTGTTCCACATAATCATTCAGAATTGTGTATTCCCCTATAATATAATAATAACAGGAAAGAAAGAAAGACCTCAACATTGGCGCCTCTGTGGTAGTCCATGGCCAATGTCTCAGCCGTACGCTTCCCTTCGTCGTAACAACTCCGAACACCTGTGGTTCCAATTGTCACAAAAAGATTCAAGAATATAAATGAAATGCGAGGAAAAAGTTTTTACCGATGGGATTAACGTTGCCCCAGTAAGTCTCAAGCTGAGGGTGTTGGAGAGGATCTCCGTACACCTCACTGGTACTGGTAAGCAGGAATCTGGCTCCCACTCTCTTGGCGAGACCCAACATGTTCAATGTACCCACCACGTTGGTCTTAATAGTCTTGACGGGATTGAATTTGTAGTGAACAGGAGAAGCAGGGCAGGCGAGATGGTAGATGTGGTCAACCTCAAGAAGGATGGGTTCGACGACGTCGTGCCTGATGAGCTCGAAGTTTGGGTTACCGAAATGGTGCATCACGTTCTCTTTACTCCCCGTGAAGAAGTTGTCCACCACGATCACTTTGTCTCCTCTCGCCATCAATCGGTCCACCAGGTGTGACCCCACGAAACCGGCCCCACCGGTCACCACCACCCGAAGACCTTTGCGTTTCAGACCCAGAGGGATCTTTCCTCCCACCGATCCTATTCCACCGCTCATGTACGATCTCATTTCCGGATCCGAGTAGTAGGAGATCGGAATGGGTTGGGTGGTGGAGGATGGAGAGAAAAGCGTGAAAGCAAACGTGGCGATTGCAATGCCGACGAGAACGAAGACGAGTCTCTGTTCCCTGAGCATGTAACGGATCGGCTTCATTGGTTTCCTATACAAGGCTCGGCCTTCTGCTTGCTCCATCTCGTGTCGCCGGTATGTCAGCTCCGACGCCATCTTCTTCTTCTTCTTTGATTATTGAAATCTGGAATTAATGGATGGGTGTGATGGATAAAGAGACGACAGAGAGAGTATTTATCGGAGGAGTGTCTTTGATTACGGAGTCGAACTTGCCGGAGACTCAAACAACTCAGTCGACCGACTTTTTGGACAATTCTGAAAAGCCTTAATGGGCTTTCTCTATTTTTTTTAATTACAAGCCGCGTTAGCCTCTTCTTTACTATAATACTACGCTAATAAGTGCCCTTTCATTTAATATGCCTTCTTTTTTCTCCATTACTCGTTTTTATATTTTAATAAAGTCAAATGTTTCTTCTAAACCGGCCAATCTATTTATATCTTTGTCCATTTTCCTAACAGTTTCTTTCATTATAAATAAATAAACTTGTCTTCAGAAATTTAAATAATTAGTTTTTTTTTAATAAATGAACTTATAAGTTTCCCTTATTACTTGTCCGTATCCAGTTTATTGTTTATCATAAATCCCTCAAATTAAATACTTACTGTTGCTTTTTCGCAATTAATGCTATTTTGTTACATTTTAACTTTTCTGCACAAATTGTAACCTTTTTTTTGCTAAACTGTAAATATCATAGATGATCAAAAGAGTTTACAAAGAATCTTTGGACCGAGCCATCATGGCAAAAAAAGAATAAAAAACAAGATGGATCAAGAGTTACACACTACAAACAAACTATCTCAGCCACATCACAAATTGTAACCTTTGTACAGTTTTAACATAAGTTTGTTAGAAAGAAAACAAATCCATACCACATGACATAAGTCACATAAAAATGAAAAAGAAATAGTTTTAGAAGGGCAAGTATGAAATCATATGACCGAACATTGAGATTTGGTGTCGGTAATGGACAAAGAGAGGCCAAAAGTTAGCTGAGGTTGGCTGAATAGTGACAATCCAAAACACACCTTACATGCATAATAATGCATTTAGTCATAAATTTTTTGAAATATTTTTATGGTATAAAAACAATTAACCAAAAATAAAGCAGATAACATAAACCGTATTTGGGCTAATTTCATCTTTATGTTAGATTCGATTAGGATTATAGTTCATGTTTCAAGAACTGTTTATTTGTTTTCTTGTACGTTTTGGGTTTGGGCTGCTGCTTGCTGGAGTGAACGAAATGAGCAGGTGATAGAGGTAATCGGGAACATCACACTGGACTATATATTAATTAACCCGAGACATTATAATCCTCTTATCATTTAGTTTCGAATTTAGGCCTCACTAGTAAAGCAGCAATTCAAAGTTTCATATCATCCCTCTCCCCATTTCAAAACATACTCTCGTCTTCCACAGATAAATGCACACTTCCAATTTTTACAACTTTATAAACCGACAGGACTCATTCAGTATATAGGACATGTAAGCTTATTAAATGCGACTATGACATATGGCTTAGTTTCACGTAGTCTCACCATCCGAATTTAAATCCGTATATATAATAATGTATGTGCTTATAAGAAAAACTAAACCCAATACTCATCATTCATTCCCCCATATATACTTCTGTGGAATGAAGAATTTGTTAGATAATAAAACAAACAAACAATTCATCTTTTAAAATCGTTTTCTAAAAAAGTACTCGAAAAAATTGTCTGCAAATTGTCATGAAACTTGCGGAAGGGCAAAATGGCTAACATGTATGTAACTATTTCGATCTGACTGATCGATCATACATTTGTAAATAATAATCAATTTAACAGAGAGAGAGACTAAAGCCAAAACGTATTATGAAATCATAAATTAATGATAATTTGTTTTAATGTAGTATAATTCATCGTGTGTAATAAGAATAATAAGCGCATAGCGTAGACTAGAAGCCATCATAAGCAAGCTTGTTCAGTAGCGCCAGAGCGTTGCTGCATAGCTGCATACACCTGGTCGCTCTCCTCCGAATCATTCTCACCGTCGACGATCTAATCGACGTCTCCTCAAACCCATCTAGACACGTGTCCTCATCCGTGAGTGCTGAGCTTAACCACGTGGCGAGATCACTCATCTGCTGCTGAAACTCGTCGTCGGCGCCCAGTTTCCGGAGAACGGCGAGCGACTTGTACAGATTGCCAAGGGAGTCCACGAACAGCTCTCGACAATCCGATAACGCGATTCTCTCGCGTTTCCCAACCGCCGAACTCCGCGTTTTCAGCAAGAGTCTCAGGATCTGTTTGGTGTCGGTTATGGTCACCGCGACGCCAGCCCGGGCCCACTTGCTCGAGTTGTTTTTAGCCACGATTGCAAACGGCCATAACGTATGAAAGCATAGCTGTTGGTATTGCGTTACGCTGCACGCGTTTTTAACATACCTGCTGTACCGCGTTACCACCCTACACGGGTTTGTATCGTCTGTATGGTTGCGCCCAGAGGCTAACGACGGGTTTGAGTTTAGTGCCAGAAGAGAGAGAAGAGCAAACGTGATAAAAGAATTCATATGCTTAGAAGAATGATCTAAACTAGCTCTGGGCGATATTGTAGATTGAAAGAGAAAGAGAGAGAGAGAGAGAGAGAGAGAGAGCTAGTGACTATAATATACAGAGTCTGATATATGTATACACGAAGGAGCCGATGGGATTATTACGTAACTTTAAACTCTTTTTAATTAAGATATAAGGACGTGAACTTGAAGTTTTAAAGCATATGGGTAAGTCCATCAATAGGTATCCCTGAACTATAATTGAGAAGTGATTTTGACGTTTGTCATCACCACATTCATTCTCACTAAATAAAGATGATATGCCAAGAAAAATAGATGAAATTGTTCTTAGAAAAAAATGACATGACATCTAACTATTTCCGATATGTATAATTTTTATAAAGATTTATATATTTTTGGCAAGTATTTTTAAATATGACAATGACTAATAATTTATATATCGTCATTAATAGAAATTATCATATAAATATTTATTTTTTGATAAAACTATTAAAATATATTAATAACTCATATATCACTAATAAAGTAATATATATATATATCACATAATGAAAAAAAAAACTAAATAAGATTACAAATATAATTTTTACATTAACTTATATATGATATTTGTATAATTATATATATTTTACCAAAATTAATTATAAATATGCATCAACGAATACAAAACTAAAATAACACTAATCAATTTTTTGATAGTCCATTTGTAGGTATTATTATAGTAATCACTATAACGACTAAAGATTATATGGTTGCATGTTAGCCAAATTTAGGTTTAGGTATACGGTATAGTTTTCCATTTCTCTTACCATTTAAAGTAGAGACTACCACAAGATCCTATACGTAGATTTCCGTAAAACATATTTTGCTTCCTAGATTATTAAACTAATGGATTAATGAATAAACTAACACAGATAGTCATTTTTCTAAATTTTGAAGGTTGCAGAGGAAGCAAGAGAAAGGTGAGAAGCAATAATGAAAGTGTAAAAAGACTATGAAAAAGTCAGTTGAAGCCGACAGATTGGTAACTCTTTAAGCTTAATTCTTTGATCCCCAAATCATTTAATGTGTTTGGAAATTATTGAATTTGATTATTGTTTTCCTTGAAGCAAGAGGGAAATTTTAGTTTTTTTTTCTAATATTTTAAATAGACCAGTTTTTAAGTGGAGTTTTTTTGTTCACAAACTACTTTCATTAAGCTTCTTAGACCTGGTTCAATACAAGGTCTTTAAGGGCCTGTTTCGCCAAATTGTCCTCAAAACAGAGAGAGGAGCGCTTAACAAATCTAAAGGAAATTGAAGCAAACTGAGACGAGAGAAGATAGATATCCGCCAGGATTCCATGGAGATCCGAGATATCGGCCTGATCAACAATTGCTGCCACCAACTGCAACGAGTCCGATTCAAAGGTCACCTTCCTGAGCTGTAGAGATATTGCATGTTCCATCGCCGATCGCAAAGCCAAACCCTCCGCTACAAGGGATGAGCTAACAAACATTAAAGAGTCACTGTGAGAGATAAACCTCTCATTTCGGTTATCCAAGAAACTCCACCCCAATCCGGCTGCATGCTGGTCCTCGATCCAAGCTGCGTCTGATCTACAAACCATATCCAATGTTACATCTTGCTTTCGCCGTACTGGATTTGCTGGGGAAGGTAACGCTGGTGTTTGGGCCAGTTTCCACTCTTTCGCATCCACTATTGCTTTTGTCATAACCTCTTGAGCTGAGAAAGAGCGCTTTTGGAAAATTTTTAGATTTCTGGCCGTCCAAATTGCAGAGATTACCCAGGGGGCCAGGGGACAGTCATAAAGTCCGGTAGGTGGGAGAGAGGTGGTCTTCAAAGCAACTTTCCACCCCTCATTGAATGATGACAAGCTGAACGGGTCAAAACCACGTGACACAGGTAACAACTCCCAAACCTTTTGCGCAAAAGTACAGTGAAAGAATAAATGAAGGATTGATTCCGGTTGATCGCAGTGAATGCACTTAGCACTAGAGACAATATGCCTTAACACTAGGGTCTCACCCACCGGTAGCACTCCATGTTTAATCTTCCAGATAAGCAATTTAAGCTTAGGGGCCATAGGTAGCTTCCATAAATCCTCAATCCACTCCTGCGCCTGCTGTAGGGGTTCAAGGATAAAAGCTCTGTTCTTCTCCAGCGCTGCGTAATACCCTGTCTTAGTTGAGTACGAACCAGACTTGTGTTTGAGCCAAATCCTTTTGTCTTTTCCTCCCCACTTGCTTGGTTTAATGGTCATGATGTCTCCTAGTAGAAGAGGGAACAATCTTTCAACCTTATCTTTATCCCACTCTCTAGAGTGATCTCTGAAGAGCTCCGCCACCAAAGCTTCTGAAGTTTCTTCCGGGGCCGGTCCCATAGGGTAGACTTGCGCCTGAGAAGACAGCCAAGGGTCTCTCCACATACGTGTGCCTTGTCCATCCCCTATTACCCATCCAAGGTTTTCCTTTAACAGGTCTCTACCTATCAATATCCCTCTCCAGCCATGGGAGCAAACATTAGGAGTCGAGATCTGTAGGAAGTCCTGGTCTTGGAAGTATTTACCACGTAGGATTCTGGCCAGAAGGCATGAAGGAGAGGATAGGATTCTCCAGCTTGTCTTTGCAAGAAGGGCATCACTAAAGCTTTGGATATCCCTTATTCCCAATCCTCCATCCTTCTTGGATTTAATCATAGTGTCCCAAGCTACCTACGACATTTTCCTGTGATCAGGTGAGGCATCCCACCAAAACCTGGTGAGGGCCGATTGGATTCTAGCACAGACAGATTGAGGAATTTTGAAAGCCTGCATCGTGTGATTTGGCATCGCTGAGAGCACACTTTTGAGGAGAGTGAGTTTCCCAGCCAGAGAGAGATGTCTGTTAGAAAAGCTTGCGGCTCTTTGTCTTATTTTATCCACCAAAGAGGTGAATATATCACTCTTTTTTCTTCCAAAATGCTCAGGGACAGAATCAAATCATTCAATACCCAAAAAGTGACCGGTTACAAGATCGTTATCTGAACCGGTTGAGTGATATTTAATAGTGTGATGTGCGTTGGCATTGAAACTGGACGAGCCCACTGATATTCACACGTGTTACTTAGCCCAAACTCACTACCTAACCACATTTTGGTATTTGATTTGATGTGATGGTGATGATTTTTATTAACTAAACCCCTCCCCTCGTATTGATAATCACTGGAGTTGGAGTCATTCCAAAATCCTTGATAAGAGAGTCGGGGTTCGTTTGAATTATCTGCATCTGTTTTCATTGTTTTAATATGCTATGTAGAGATTGAGTAAACTGATGTGGTTCTTTTTTGTGTTCTCAAATTATCAACCAATTCGAATGGAAGAAACATGATATACAAGGAGGAACTGCGTAAACTCAGAGCAGCCTCCAGGAACGGTGAACAAGCTACCTCATCACTAGTCACCACCAATCCTCCTCCAAGTTAATTGACATGTAAAAGTTTTAAAAGAGAAAGATAGCCACATCATTACTAAACGGGAATGATATAGTTTAGGAATACGCTGATGATAAAAGAGTACATGTAATAAACAATCACACACAAAAGATTGTCTTGAATCATTTCACATCAAGGTAAACATTATTTCACTCTTTTCACCGAATTTTGATTTGAGTATGCAGAGACACTTTATTTTGGCTGTTGGGTGATCATATATCAGACCTTGATCTTAGGCTTCTTCACGATCATCACCGAGCAATGCGCATGGTGAGCACAGTAGTCGCTCACGCTCCCGATAACCGCCCTGTCCCAACAAGTGATGATGATCATTGTCAAGTTCCCAATATATATATATATATATATATATATATATATATATATATATATATTTTTTTTTAAAAGGATATATATATATAGATGAATTATATAATTTAATTAATTGACCTCTTGATAGCTCCATGACCATGGCTTCCCACAACAAGAAGAGAAGCATGGTGTTTATCCACAACCTCGCACAGGATATTCCTTGCATCGCCTTCGAAAACTTCCATCGTCGCGTCATGAACCTTCACATATCAAACCTAGAATAATTGAGAATAAGGTATTTTGCGGCCTTAATTAGCCTAGGAGCTAACCAAAAGATTAGATAATAATTAATTGTTAAGAAAAAAAAAAGTAGGGAAAAAGGAAAACTAGTGTGTCTATAGCTTGATGCGTCTGAGTGATTCACACAACCGAAACCTCATATAAGCATATAAACATACATGATGAATGAATAACGAAGTAACACACACACATGCACATGTATTAGTTTCTTATCAAATAGTCTCATGATCATCCGTACGTACCGATTTGCTATCACAGATTCCTTTGGCCTTGTCGACAACCTTAGCAGCGGTATGCTTTAAATCTGCATCAAGATGAGGCACAACCTCCGCAATTCCGAGACCAGCGAAACCAACGGCAGAGACTGCGTTAGGTTTGGCGTGGATGATCAAGAGCTTGAACGGAAAATTTGGAGCGTAAGGAGCGAAGAAACGATCGAGCGTCCACTCCAAAGCGTAGGTGCTCTGCTCGCTTTCGTCGACACCGACAACCATCAGCGGTTTCTCCTCTCCGGTAGCCATGACTCTCTTTTGTTTGAGCTTATAGAAGAAGGCGAAGAAGAAGATTCCGAAACTGATGTAGCAGAGAGAAAAGAGTGAGAGAGAGCTTTCTTTCTATACAGCAAGTGAAAGAGGAAGGAATGCGATACTCTGTCTGATGGTCCTCGTTACTACTTTATTCCCCCTCTTTTTTTCTTTGATAAGTAACCGAATATTTTACTTGTTTTGCATGGTCGCTTTCAATGTTACGTGGCCCAGAAATAAGTTTTCCACATTGCGGGCCGAGGCCCAAATAATTAAGTTGAGTGGGAGATAATGTGGAGGGCATGCAATACAATATACAGTGGATTTGAAACGTAAAGACTCGACTCGTCGTCGCATCTTCTCCTCTGTGCTTGTTTGGTTTCGCATTCATCGTTTGTGTGCAATAAAATATTCGACTATAATCGGGTTTTAGAAACTGAACTGGATTCATCATAAACATAACCTTTATTTTATTTTTTTTTTATAAAAAGGAAAAAGCAAGATTACTAGGAGGAAGCAGCTAACGAAGAAGATGACAAGTTGGTCTGCAAATGCGAGGTACCTTGGAAGCCAGGAAAGTTGGTGTTGCCCTTCTTGAGGAAAGCAGAGTACCAATGAGCAGAGAGTTTGGGTGATCTTTTGCGATGAGGATCGCTGAAATTCACAGAGTACAAACCAAAACTAAAATTGTATCCGCTTAGCAACTCGTACAAATCCATAAAGGACCACACGAAGTAGCCTCTCGTGTCTGATCCATTCCTAACGGCTTTGAGGACAGCACCAATATAAGCATCTAAGAACTCAATCCTAGGCGTGTCCTTCTCTTGCAGCTGCAAATCTTGCTTCATCGGTTCACC',
    start: 0,
    end: 23320,
    genomeId: genomeId,
    permission: 'admin',
    isPublic: false
  })

  let geneId

  if (annot) {
    const subfeature = {ID: "BniB01g000010.2N.1", phase: '.', type: 'mRNA', parents: ['BniB01g000010.2N'], seq: 'GTATTCTAAACT', start:13641, end:15400, score: '.', attributes: {}}
    const cds = {ID: "BniB01g000010.2N.1.cds1", phase: '.', type: 'CDS', parents: ['BniB01g000010.2N.1'], seq: 'GTATTCTAAACT', start:13641, end:13653, score: '.', attributes: {}}

    Genes.insert({
      ID: 'BniB01g000010.2N',
      seqid: 'B1',
      source: 'AAFC_GIFS',
      strand: '-',
      type: 'gene',
      start: 13640,
      end: 15401,
      genomeId: genomeId,
      score: '.',
      subfeatures: [subfeature, cds],
      seq: 'AAAA',
      attributes: {"myNewAttribute": 1}
    })
  }

  return { genomeId, genomeSeqId, geneId: "BniB01g000010.2N" }
}

export function addTestTranscriptome(genomeId, geneId) {

  const expId = ExperimentInfo.insert({
    genomeId: genomeId,
    sampleName: "sampleName",
    replicaGroup: "replicaGroup",
    description: 'description',
    permission: 'admin',
    isPublic: false,
  });

  const transcriptomeId = Transcriptomes.insert({
    geneId: geneId,
    tpm: "60",
    est_counts: "1000",
    experimentId: expId
  })

  return { expId, transcriptomeId }

};
