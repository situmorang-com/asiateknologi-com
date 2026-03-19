import { db } from './db';
import { adminSessions } from './db/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export function createSession(): string {
	const id = randomUUID();
	const now = new Date();
	const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000);
	db.insert(adminSessions)
		.values({
			id,
			expiresAt: expires.toISOString()
		})
		.run();
	return id;
}

export function validateSession(sessionId: string): boolean {
	const session = db
		.select()
		.from(adminSessions)
		.where(eq(adminSessions.id, sessionId))
		.get();
	if (!session) return false;
	return new Date(session.expiresAt) > new Date();
}

export function destroySession(sessionId: string): void {
	db.delete(adminSessions).where(eq(adminSessions.id, sessionId)).run();
}
