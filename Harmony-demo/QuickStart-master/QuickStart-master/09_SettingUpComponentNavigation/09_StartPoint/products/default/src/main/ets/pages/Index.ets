// import { CourseLearning } from 'learning';
import { KnowledgeMap } from 'map';

@Entry
@Component
struct Index {
  build() {
    Column() {
      // CourseLearning()
      KnowledgeMap()
    }
    .backgroundColor('#F1F3F5')
    .padding({ top: 36, bottom: 28 })
  }
}