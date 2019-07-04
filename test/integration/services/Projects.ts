import { Projects } from '../../../dist';

let service: Projects;

beforeEach(() => {
	service = new Projects({
		host: process.env.GITLAB_URL,
		token: process.env.PERSONAL_ACCESS_TOKEN,
	});
});

describe('Projects.create', () => {
	it('should create a valid project', async () => {
		const p = await service.create({ name: 'Project Creation Integration test' });
		expect(p).toBeInstanceOf(Object);
		expect(p.name).toEqual('Project Integration test');
	});
});

describe('Projects.upload', () => {
	let project: object;

	beforeAll(() => {
		project = await service.create({ name: 'Project Upload Integration test' });
	});

	it('should upload a text file', async () => {
		const content = 'TESTING FILE UPLOAD :D';
		const results = await service.upload(project.id, content, {
			filename: 'testfile.txt',
			contentType: 'text/plain'
		});

		expect(results).toContainKeys(['alt', 'url', 'markdown']);
	});
});
