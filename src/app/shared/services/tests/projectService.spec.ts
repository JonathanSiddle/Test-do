import { ToDoProject } from './../../models/todoProject';
import { ProjectService } from './../projects.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { asyncError } from '../../../../testing/shared/async-observable-helpers';

let httpClientSpy: { get: jasmine.Spy };

// Straight Jasmine testing without Angular's testing support
describe('projectService', () => {
    let projectService: ProjectService;
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        projectService = new ProjectService(<any> httpClientSpy);
    });

    it('get all should return a list of projects and be called once', () => {

        const expectedProjects: ToDoProject[] = [{Id: 1, Name: 'Test1', Owner : 'Jon'}, {Id: 2, Name: 'Test2', Owner : 'Jon'}];

        httpClientSpy.get.and.returnValue(of(expectedProjects));
        projectService.getAll().subscribe(
            projects => expect(projects).toEqual(expectedProjects, 'expected projects'),
            fail
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
        // expect(false).toBeTruthy();
    });

    it('should return error on 404', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404, statusText: 'Not Found'
        });

        httpClientSpy.get.and.returnValue(asyncError(errorResponse));
        projectService.getAll().subscribe(
            projects => fail('expected error'),
            error => {
                // console.log('Error Message: ' + error.message);
                // console.dir(error);
                expect(error.message).toContain('Not Found');
            }
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
        // expect(false).toBeTruthy();
    });

    it('should return error on 401', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 401 error',
            status: 401, statusText: 'Not Authenticated'
        });

        httpClientSpy.get.and.returnValue(asyncError(errorResponse));
        projectService.getAll().subscribe(
            projects => fail('expected error'),
            error => {
                // console.log('Error Message: ' + error.message);
                // console.dir(error);
                expect(error.message).toContain('Not Authenticated');
            }
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
        // expect(false).toBeTruthy();
    });
});
