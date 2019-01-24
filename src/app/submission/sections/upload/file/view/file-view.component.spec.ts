import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';

import { createTestComponent } from '../../../../../shared/testing/utils';
import { mockUploadFiles } from '../../../../../shared/mocks/mock-submission';
import { FormComponent } from '../../../../../shared/form/form.component';
import { UploadSectionFileViewComponent } from './file-view.component';
import { TruncatePipe } from '../../../../../shared/utils/truncate.pipe';

describe('UploadSectionFileViewComponent test suite', () => {

  let comp: UploadSectionFileViewComponent;
  let compAsAny: any;
  let fixture: ComponentFixture<UploadSectionFileViewComponent>;

  const fileData: any = mockUploadFiles[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      declarations: [
        TruncatePipe,
        FormComponent,
        UploadSectionFileViewComponent,
        TestComponent
      ],
      providers: [
        UploadSectionFileViewComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then();
  }));

  describe('', () => {
    let testComp: TestComponent;
    let testFixture: ComponentFixture<TestComponent>;

    // synchronous beforeEach
    beforeEach(() => {
      const html = `
      <ds-submission-upload-section-file-view [fileData]="fileData"></ds-submission-upload-section-file-view>`;

      testFixture = createTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;
      testComp = testFixture.componentInstance;
    });

    afterEach(() => {
      testFixture.destroy();
    });

    it('should create UploadSectionFileViewComponent', inject([UploadSectionFileViewComponent], (app: UploadSectionFileViewComponent) => {

      expect(app).toBeDefined();

    }));
  });

  describe('', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(UploadSectionFileViewComponent);
      comp = fixture.componentInstance;
      compAsAny = comp;
    });

    afterEach(() => {
      fixture.destroy();
      comp = null;
      compAsAny = null;
    });

    it('should init metadata array properly', () => {
      comp.fileData = fileData;

      fixture.detectChanges();

      console.log(comp.metadata);
      expect(comp.metadata.length).toBe(2);

    });

  });
});

// declare a test component
@Component({
  selector: 'ds-test-cmp',
  template: ``
})
class TestComponent {

  fileData;
}