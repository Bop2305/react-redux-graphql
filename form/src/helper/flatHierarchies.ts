const flatHierarchies = (hierarchies: any, arrHierarchies?: any) => {
  let _arrHierarchies = arrHierarchies || [];

  for (let i = 0; i < hierarchies?.length; i++) {
    if (Array.isArray(hierarchies[i].hierarchy)) {
      _arrHierarchies.push(hierarchies[i]);
      flatHierarchies(hierarchies[i].hierarchy, _arrHierarchies);
    } else {
      _arrHierarchies.push(hierarchies[i]);
    }
  }

  return _arrHierarchies;
};

export default flatHierarchies;
