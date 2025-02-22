// queue.processor.ts
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('messageQueue')
export class QueueProcessor extends WorkerHost {
  async process(job: Job<any>): Promise<void> {
    try {
      console.log(`Processing job ${job.id}:`, job.data.message);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate async task
      console.log(`Job ${job.id} completed successfully.`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Job ${job.id} failed:`, error.message);
      } else {
        console.error('An unknown error occurred');
      }
      throw error; // Job will be retried automatically
    }
  }
}