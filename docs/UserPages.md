# User Pages

## Component Relationships

### UserHomePage
- Displays user-specific information.
- Fetches user data on mount.
- Uses various widgets to display different types of information.

#### Components Used in `UserHomePage`

1. **TreeGauge**
   - Displays information about trees.
   - Imported from `./user-homepage/TreeGauge`.

2. **LogGauge**
   - Displays information about logs.
   - Imported from `./user-homepage/LogGauge`.

3. **PlankGauge**
   - Displays information about planks.
   - Imported from `./user-homepage/PlankGauge`.

4. **ProjectGauge**
   - Displays information about projects.
   - Imported from `./user-homepage/ProjectGauge`.

5. **UserProfileGauge**
   - Displays user profile information.
   - Imported from `./user-homepage/UserProfileGauge`.

6. **LocationsGauge**
   - Displays information about locations.
   - Imported from `./user-homepage/LocationsGauge`.

7. **DryingGauge**
   - Displays information about drying processes.
   - Imported from `./user-homepage/DryingGauge`.

8. **ContactsGauge**
   - Displays contact information.
   - Imported from `./user-homepage/ContactsGauge`.

9. **LocationGauge**
   - Displays specific location information.
   - Imported from `./user-homepage/LocationGauge`.

10. **SpeciesGauge**
    - Displays information about species.
    - Imported from `./user-homepage/SpeciesGauge`.

11. **SawmillProfileGauge**
    - Displays sawmill profile information.
    - Imported from `./user-homepage/SawmillProfileGauge`.

12. **TreeAgeGauge**
    - Displays information about tree ages.
    - Imported from `./user-homepage/TreeAgeGauge`.

13. **UsersGauge**
    - Displays information about users.
    - Imported from `./user-homepage/UsersGauge`.

14. **AddSawmillGauge**
    - Displays information about adding sawmills.
    - Imported from `./user-homepage/AddSawmillGauge`.

15. **StockSearchWidget**
    - Allows searching of stock items.
    - Imported from `../components/search/StockSearchWidget`.

16. **TreesWidget**
    - Displays tree-related information.
    - Imported from `../components/components-for-dev/dashboard/widgets/TreesWidget`.

17. **LogsWidget**
    - Displays log-related information.
    - Imported from `../components/components-for-dev/dashboard/widgets/LogsWidget`.

18. **PlanksWidgetNew**
    - Displays plank-related information.
    - Imported from `../components/components-for-dev/dashboard/widgets/PlanksWidgetNew`.

19. **StockLevelsWidget**
    - Displays stock levels.
    - Imported from `../components/components-for-dev/dashboard/widgets/StockLevelsWidget`.

20. **ProjectStatusWidget**
    - Displays project status.
    - Imported from `../components/components-for-dev/dashboard/widgets/ProjectStatusWidget`.

21. **ProjectDeadlinesWidget**
    - Displays project deadlines.
    - Imported from `../components/components-for-dev/dashboard/widgets/ProjectDeadlinesWidget`.

22. **WidgetMap**
    - Displays a map with widgets.
    - Imported from `../components/locations-components/WidgetMap`.

### Display and Interconnections

- **TreeGauge, LogGauge, PlankGauge, ProjectGauge, UserProfileGauge, LocationsGauge, DryingGauge, ContactsGauge, LocationGauge, SpeciesGauge, SawmillProfileGauge, TreeAgeGauge, UsersGauge, AddSawmillGauge**:
  - These gauges are displayed in a grid layout to provide various metrics and information related to the user and their activities.
  - Each gauge is responsible for displaying specific data and is imported from the `./user-homepage` directory.

- **StockSearchWidget**:
  - Allows users to search for stock items.
  - Integrated into the `UserHomePage` to provide quick access to stock search functionality.

- **TreesWidget, LogsWidget, PlanksWidgetNew, StockLevelsWidget, ProjectStatusWidget, ProjectDeadlinesWidget**:
  - These widgets are displayed in a grid layout to provide detailed information about trees, logs, planks, stock levels, project status, and deadlines.
  - Each widget is imported from the `../components/components-for-dev/dashboard/widgets` directory.

- **WidgetMap**:
  - Displays a map with various widgets.
  - Integrated into the `UserHomePage` to provide a visual representation of locations and related data.

### Summary

The `UserHomePage` component is a central hub that displays a variety of information and metrics related to the user and their activities. It uses a combination of gauges and widgets to present this information in a structured and visually appealing manner. Each gauge and widget is responsible for displaying specific data, and they are all integrated into the `UserHomePage` to provide a comprehensive overview of the user's activities and metrics.