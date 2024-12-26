"use server";

import { prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';

// CREATE: Create a new leave request
export async function createLeaveRequest(data: FormData) {
  console.log(data);
  const employeeCin = data.get('employeeCin') as string;
  const startDate = data.get('startDate');
  const endDate = data.get('endDate');
  const leaveType = data.get('leaveType');
  const reason = data.get('reason');

  if (!employeeCin || !startDate || !endDate || !leaveType || !reason) {
    throw new Error("Missing required fields");
  }

  const user = await prisma.user.findUnique({
    where: { cin: employeeCin },
  });

  if (!user) {
    throw new Error("Employee does not exist with the provided CIN.");
  }

  // Create a new leave request in the database
  const leaveRequest = await prisma.conge.create({
    data: {
      employeeCin: employeeCin as string,
      startDate: new Date(startDate as string),
      endDate: new Date(endDate as string),
      leaveType: leaveType as string,
      reason: reason as string,
      // status and requestedAt will use default values
    }
  });

  return leaveRequest;
}

// READ: Get all leave requests
export async function getAllLeaveRequests() {
  const leaveRequests = await prisma.conge.findMany({
    include: {
      requestedBy: {
        select: {
          name: true,
          department: true,
        }
      },
      approvedBy: {
        select: {
          name: true,
        }
      }
    },
  });
  return leaveRequests;
}

// READ: Get leave requests by criteria
export async function getLeaveRequestsByCriteria(criteria: {
  employeeCin?: string;
  status?: string;
  leaveType?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  const leaveRequests = await prisma.conge.findMany({
    where: criteria,
    include: {
      requestedBy: {
        select: {
          name: true,
          department: true,
        }
      },
      approvedBy: {
        select: {
          name: true,
        }
      }
    },
  });
  return leaveRequests;
}

// READ: Get a specific leave request by ID
export async function getLeaveRequestById(cin: string) {
  console.log(cin);
  const leaveRequest = await prisma.conge.findMany({
    where: { employeeCin: cin },
    include: {
      requestedBy: {
        select: {
          name: true,
          department: true,
        }
      },
      approvedBy: {
        select: {
          name: true,
        }
      }
    },
  });
  console.log(leaveRequest);
  return leaveRequest;
}

// UPDATE: Update a leave request
export async function updateLeaveRequest(id: string, data: Prisma.CongeUncheckedUpdateInput) {
  const {
    status,
    approvedById,
    approvedAt,
    startDate,
    endDate,
    ...otherData
  } = data;

  const updateData: Prisma.CongeUncheckedUpdateInput = {
    ...otherData,
  };

  // Handle special fields
  if (status) updateData.status = status as string;
  if (approvedById) {
    updateData.approvedById = approvedById as string;
    updateData.approvedAt = new Date(); // Set approval date when approver is set
  }

  // Ensure startDate and endDate are valid Date objects or valid ISO-8601 strings
  if (startDate) {
    updateData.startDate = new Date(startDate as string | Date); // Convert string to Date object
  }
  if (endDate) {
    updateData.endDate = new Date(endDate as string | Date); // Convert string to Date object
  }

  // Perform the update
  const leaveRequest = await prisma.conge.update({
    where: { id },
    data: updateData,
    include: {
      requestedBy: {
        select: {
          name: true,
          department: true,
        },
      },
      approvedBy: {
        select: {
          name: true,
        },
      },
    },
  });

  return leaveRequest;
}
// DELETE: Remove a leave request
export async function deleteLeaveRequest(id: string) {
  const leaveRequest = await prisma.conge.delete({
    where: { id },
  });
  return leaveRequest;
}

// Additional utility function: Approve a leave request
export async function approveLeaveRequest(id : string, approverId: string) {
  const leaveRequest = await prisma.conge.update({
    where: { id},
    data: {
      status: 'Approved',
      approvedById: approverId,
      approvedAt: new Date(),
    },
    include: {
      requestedBy: {
        select: {
          name: true,
          department: true,
        }
      },
      approvedBy: {
        select: {
          name: true,
        }
      }
    },
  });

  return leaveRequest;
}

// Additional utility function: Reject a leave request
export async function rejectLeaveRequest(id: string, approverId: string) {
  const leaveRequest = await prisma.conge.update({
    where: { id },
    data: {
      status: 'Rejected',
      approvedById: approverId,
      approvedAt: new Date(),
    },
    include: {
      requestedBy: {
        select: {
          name: true,
          department: true,
        }
      },
      approvedBy: {
        select: {
          name: true,
        }
      }
    },
  });

  return leaveRequest;
}